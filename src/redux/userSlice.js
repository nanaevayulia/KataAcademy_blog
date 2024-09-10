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
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserSignUp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchUserSignUp.fulfilled, (state, action) => {
      state.loading = false;

      if (action.payload.token) {
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.username = action.payload.username;
      }
    });

    builder.addCase(fetchUserSignUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchUserSignIn.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchUserSignIn.fulfilled, (state, action) => {
      state.loading = false;

      const { username, email, token, image } = action.payload;
      state.token = token;
      state.username = username;
      state.email = email;
      state.image = image;
    });

    builder.addCase(fetchUserSignIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchUserLogOut.fulfilled, (state) => {
      state.loading = false;
      state.token = null;
      state.username = null;
      state.email = null;
      state.image = '';
    });

    builder.addCase(fetchUserEdit.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchUserEdit.fulfilled, (state, action) => {
      state.loading = false;

      const { username, email, token, image } = action.payload;
      state.token = token;
      state.email = email;
      state.username = username;
      state.image = image;
    });

    builder.addCase(fetchUserEdit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
