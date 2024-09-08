import { configureStore, compose } from '@reduxjs/toolkit';

import * as appSelectors from './selectors';
import articlesReducer from './articlesSlice';
import userReducer from './userSlice';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export default configureStore(
  {
    reducer: {
      articles: articlesReducer,
      user: userReducer,
    },
  },
  composeEnhancers()
);

export { appSelectors };
