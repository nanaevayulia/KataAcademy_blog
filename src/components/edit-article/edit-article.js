import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import NewArticle from '../new-article/new-article';
import { appSelectors } from '../../redux';
import { fetchArticle } from '../../redux/articlesSlice';

export default function EditArticle() {
  const { slug } = useParams;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [dispatch, slug]);

  const pageName = 'Edit article';

  const articles = useSelector(appSelectors.articles);
  const article = articles.filter((item) => item.slug === slug)[0] ?? articles[0];

  const username = localStorage.getItem('username');

  if (article?.author?.username !== username) {
    navigate(-1);
  }

  return <NewArticle pageName={pageName} {...article} />;
}
