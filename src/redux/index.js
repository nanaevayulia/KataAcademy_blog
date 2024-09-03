import { configureStore, compose } from '@reduxjs/toolkit';

import * as appSelectors from './selectors';
import articlesReducer from './articlesSlice';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export default configureStore(
  {
    reducer: {
      articles: articlesReducer,
    },
  },
  composeEnhancers()
);

export { appSelectors };
