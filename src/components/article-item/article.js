import { Tag, Spin, Alert, Popconfirm } from 'antd';
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';

import { appSelectors } from '../../redux';
import { fetchArticle } from '../../redux/articlesSlice';
import getTrimText from '../../utils';
import heartNull from '../UI/heart_null.svg';
import heartRed from '../UI/heart_red.svg';
import NotFound from '../not-found';

import style from './article-item.module.scss';

const Article = () => {
  const { slug } = useParams();
  if (!slug) {
    return <NotFound />;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(appSelectors.userObj);
  const token = user?.token ?? localStorage.getItem('token');

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [dispatch, slug]);

  const fromPage = location.state?.from?.pathname || -1;

  const articles = useSelector(appSelectors.articles);
  const loading = useSelector(appSelectors.loading);
  const error = useSelector(appSelectors.error);

  const article = articles.filter((item) => item.slug === slug)[0];

  const author = article?.author;
  const createdAt = article?.createdAt;
  const title = article?.title;
  const description = article?.description;
  const body = article?.body;
  const tagList = article?.tagList;
  const favoritesCount = article?.favoritesCount;
  const favorited = article?.favorited;
  const username = author?.username;

  let userAvatar = '';
  if (author?.image === undefined) {
    userAvatar = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  } else {
    userAvatar = author?.image;
  }

  const postOfUser = localStorage.getItem('username') === username;

  const filterTags = tagList?.map((item) => getTrimText(item)).filter((item) => item || Math.abs(0));
  const tags = filterTags && (
    <div className={style['article__tags']}>
      {filterTags.map((item, i) => {
        return <Tag key={i}>{getTrimText(item, 15)}</Tag>;
      })}
    </div>
  );

  const deleteSpaces = (text) => {
    if (text) {
      const trimText = text.trim().replace(/ +/g, ' ');
      return trimText;
    }
    return null;
  };

  const confirm = () => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    navigate(fromPage, { replace: true });
  };

  const spinner = loading && <Spin size="large" />;

  const errorMessage =
    error && articles.length > 0 ? (
      <Alert message="Упс, возникла ошибка!" description="К сожалению, указанная страница не найдена" type="error" />
    ) : null;

  return (
    <div className={style.container}>
      {spinner}
      {errorMessage}
      {!error && !loading ? (
        <article className={style.article}>
          <div className={style['article__left']}>
            <div>
              <span className={style['article__title']}>{deleteSpaces(title) || 'No title'}</span>
              <div className={style['article__like']}>
                <input
                  className={style['article__heart']}
                  type="image"
                  src={favorited ? heartRed : heartNull}
                  alt="heart"
                  disabled
                ></input>
                <span className={style['article__heart-count']}>{favoritesCount}</span>
              </div>
            </div>
            {tags}
            <p className={style['article__description']}>{deleteSpaces(description) || 'No description'}</p>
          </div>
          <div className={style['article__right']}>
            <div className={style.userInfo}>
              <div>
                <p className={style['article__userName']}>{deleteSpaces(username) || 'Anonymous>'}</p>
                <p className={style['article__date']}>{format(createdAt || Date.now(), 'MMMM d, yyyy')}</p>
              </div>
              <img className={style['article__avatar']} src={userAvatar} alt="avatar" />
            </div>
            {postOfUser && (
              <div className={style['article__buttons']}>
                <Popconfirm
                  description="Are you sure to delete this article?"
                  okText="Yes"
                  cancelText="No"
                  placement="rightTop"
                  style={{ width: '246px' }}
                  onConfirm={confirm}
                >
                  <button className={style['btn__delete']} disabled={loading}>
                    Delete
                  </button>
                </Popconfirm>

                <Link to={`/articles/${slug}/edit`} className={style['btn__edit']} disabled={loading}>
                  Edit
                </Link>
              </div>
            )}
          </div>
          <div className={style['article__text']}>{<Markdown>{body}</Markdown>}</div>
        </article>
      ) : null}
    </div>
  );
};

export default Article;
