import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const _baseURL = 'https://blog.kata.academy/api/';

let articlesObj = [];
let articleObj = null;

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (page = 1) => {
  try {
    const url = `${_baseURL}articles?limit=5&offset=${(page - 1) * 5}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    articlesObj = await response.json();
    return articlesObj;
  } catch (err) {
    console.log(err.message);
  }
});

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async (slug, { rejectWithValue }) => {
  try {
    const url = `${_baseURL}articles/${slug}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    articleObj = await response.json();
  } catch (err) {
    return rejectWithValue(err.message);
  }
  return articleObj.article;
});

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
  },
});

export default articlesSlice.reducer;
