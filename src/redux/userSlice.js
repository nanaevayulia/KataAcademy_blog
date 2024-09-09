import { createSlice } from '@reduxjs/toolkit';

import { fetchUserSignIn, fetchUserSignUp, fetchUserLogOut, fetchUserEdit } from '../api/api_user';

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
