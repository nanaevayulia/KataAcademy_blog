import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const _baseURL = 'https://blog.kata.academy/api/';

let userObj = null;

export const fetchUserSignUp = createAsyncThunk('user/fetchUserSignUp', async (data, { rejectWithValue }) => {
  try {
    const url = `${_baseURL}users`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    userObj = await response.json();

    if (userObj.user) {
      localStorage.setItem('username', userObj.user?.username);
      localStorage.setItem('email', userObj.user?.email);
      localStorage.setItem('image', '');
      localStorage.setItem('token', userObj.user?.token);
    }
  } catch (err) {
    return rejectWithValue(err.errors);
  }
  return userObj.user ?? userObj.errors;
});

export const fetchUserSignIn = createAsyncThunk('user/fetchUserSignIn', async (data, { rejectWithValue }) => {
  try {
    const url = `${_baseURL}users/login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    userObj = await response.json();

    if (userObj.user) {
      const { username, email, image, token } = userObj.user;
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      if (image === undefined) {
        localStorage.setItem('image', '');
      } else {
        localStorage.setItem('image', image);
      }
    }
  } catch (err) {
    return rejectWithValue(err.message);
  }
  return userObj.user;
});

export const fetchUserEdit = createAsyncThunk('user/fetchUserEdit', async (data, { rejectWithValue }) => {
  try {
    const url = `${_baseURL}user`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    userObj = await response.json();
    if (userObj) {
      const { username, email, image, token } = userObj.user;
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('image', image);
      localStorage.setItem('token', token);
    }
  } catch (err) {
    return rejectWithValue(err.message);
  }
  return userObj.user;
});

export const fetchUserLogOut = createAsyncThunk('user/fetchUserLogOut', async (data) => data);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    username: null,
    email: null,
    image: '',
    loading: false,
    error: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserSignUp.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchUserSignUp.fulfilled, (state, action) => {
      state.loading = false;

      if (action.payload.token) {
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.username = action.payload.username;
        // state.image = action.payload.image;
      } else {
        state.errors = { ...action.payload };
      }
    });

    builder.addCase(fetchUserSignUp.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(fetchUserSignIn.fulfilled, (state, action) => {
      state.loading = false;

      const { username, email, token, image } = action.payload;
      state.token = token;
      state.username = username;
      state.email = email;
      state.image = image;
    });

    builder.addCase(fetchUserSignIn.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(fetchUserLogOut.fulfilled, (state) => {
      state.loading = false;
      state.token = null;
      state.username = null;
      state.email = null;
      state.image = '';
    });

    builder.addCase(fetchUserEdit.fulfilled, (state, action) => {
      state.loading = false;

      const { username, email, token, image } = action.payload;
      state.token = token;
      state.email = email;
      state.username = username;
      state.image = image;
    });
  },
});

export default userSlice.reducer;
