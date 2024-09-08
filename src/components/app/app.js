import { Route, Routes } from 'react-router-dom';

import Layout from '../layout';
import ArticlesList from '../articles-list';
import { Article } from '../article-item';
import SignIn from '../signIn';
import SignUp from '../signUp';
import EditProfile from '../edit-profile';
import NotFound from '../not-found';
import NewArticle from '../new-article';
// import EditArticle from '../edit-article';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticlesList />} />
          <Route path="/articles/" element={<ArticlesList />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/new-article" element={<NewArticle />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
