import { createAsyncThunk } from '@reduxjs/toolkit';

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
