import { createSlice } from '@reduxjs/toolkit';

import { fetchArticles, fetchArticle, fetchCreateArticle, fetchEditArticle } from '../api/api_articles';

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
