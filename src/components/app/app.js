import { Route, Routes } from 'react-router-dom';

import Layout from '../layout';
import ArticlesList from '../articles-list';
import { Article } from '../article-item';
import NotFound from '../not-found';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticlesList />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
