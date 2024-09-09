import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    articlesObj = await response.json();
  } catch (err) {
    return rejectWithValue(err.message);
  }
  return articlesObj;
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

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    articleObj = await response.json();
  } catch (err) {
    return rejectWithValue(err.message);
  }
  return articleObj.article;
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

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    articleObj = await response.json();
  } catch (err) {
    return rejectWithValue(err.message);
  }
  return articleObj.article;
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

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, received ${response.status}`);
      }

      articleObj = await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
    return articleObj.article;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    articlesCount: null,
    loading: false,
    error: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.articles) {
        state.articles = [...action.payload.articles];
        state.articlesCount = action.payload.articlesCount;
      }
    });

    builder.addCase(fetchArticles.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(fetchArticle.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.loading = false;
      const { slug } = action.payload;
      const index = state.articles.findIndex((article) => article.slug === slug);
      if (index !== -1) {
        state.articles[index] = { ...action.payload };
      }
      state.articles[0] = { ...action.payload };
    });

    builder.addCase(fetchCreateArticle.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchCreateArticle.fulfilled, (state, action) => {
      state.loading = false;
      const { slug } = action.payload;
      const index = state.articles.findIndex((article) => article.slug === slug);
      state.articles[index] = { ...action.payload };
    });

    builder.addCase(fetchEditArticle.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchEditArticle.fulfilled, (state, action) => {
      state.loading = false;
      const { slug } = action.payload;
      const index = state.articles.findIndex((article) => article.slug === slug);
      state.articles[index] = { ...action.payload };
    });
  },
});

export default articlesSlice.reducer;
