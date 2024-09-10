import { createAsyncThunk } from '@reduxjs/toolkit';

const _baseURL = 'https://blog.kata.academy/api/';

let articlesObj = null;
let articleObj = null;

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (page = 1, { rejectWithValue }) => {
  try {
    const url = `${_baseURL}articles?limit=5&offset=${(page - 1) * 5}`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    articlesObj = await response.json();

    if (response.ok) {
      return articlesObj;
    } else {
      return rejectWithValue(articlesObj.errors);
    }
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async (slug, { rejectWithValue }) => {
  try {
    const url = `${_baseURL}articles/${slug}`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    articleObj = await response.json();

    if (response.ok) {
      return articleObj.article;
    } else {
      return rejectWithValue(articleObj.errors);
    }
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const fetchCreateArticle = createAsyncThunk('articles/fetchCreateArticle', async (data, { rejectWithValue }) => {
  try {
    const url = `${_baseURL}articles`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: data,
    });
    articleObj = await response.json();

    if (response.ok) {
      return articleObj.article;
    } else {
      return rejectWithValue(articleObj.errors);
    }
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const fetchEditArticle = createAsyncThunk(
  'articles/fetchEditArticle',
  async ([slug, data], { rejectWithValue }) => {
    try {
      const url = `${_baseURL}articles/${slug}`;
      const token = localStorage.getItem('token');

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: data,
      });
      articleObj = await response.json();

      if (response.ok) {
        return articleObj.article;
      } else {
        return rejectWithValue(articleObj.errors);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSetLike = createAsyncThunk('articles/fetchSetLike', async (slug, { rejectWithValue }) => {
  const url = `${_baseURL}articles/${slug}/favorite`;
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    articleObj = await response.json();

    if (response.ok) {
      return articleObj.article;
    } else {
      return rejectWithValue(articleObj.errors);
    }
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const fetchDeleteLike = createAsyncThunk('articles/fetchDeleteLike', async (slug, { rejectWithValue }) => {
  try {
    const url = `${_baseURL}articles/${slug}/favorite`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    articleObj = await response.json();

    if (response.ok) {
      return articleObj.article;
    } else {
      return rejectWithValue(articleObj.errors);
    }
  } catch (err) {
    return rejectWithValue(err.message);
  }
});
