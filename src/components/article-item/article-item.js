import { Tag } from 'antd';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { fetchSetLike, fetchDeleteLike } from '../../api/api_articles';
import getTrimText from '../../utils';
import { appSelectors } from '../../redux';

import style from './article-item.module.scss';

export default function ArticleItem({
  title,
  description,
  tagList,
  createdAt,
  favoritesCount,
  favorited,
  author,
  slug,
}) {
  const dispatch = useDispatch();
  const user = useSelector(appSelectors.userObj);

  const token = user.token ?? localStorage.getItem('token');

  const username = author?.username;
  const image = author?.image;

  let userAvatar;
  if (image === undefined) {
    userAvatar = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  } else {
    userAvatar = image;
  }

  const [like, setLike] = useState(favorited);
  const [likeCounts, setLikeCounts] = useState(favoritesCount);

  useEffect(() => {
    setLike(favorited);
    setLikeCounts(favoritesCount);
  }, [favorited]);

  const filterTags = tagList && tagList.map((item) => getTrimText(item)).filter((item) => item || Math.abs(0));
  const tags = filterTags && (
    <div className={style['article__tags']}>
      {filterTags.map((item, i) => {
        return <Tag key={i}>{getTrimText(item, 15)}</Tag>;
      })}
    </div>
  );

  let likeButtonClass = 'article__heart_';
  if (like) {
    likeButtonClass += 'red';
  } else {
    likeButtonClass += 'null';
  }

  const toggleLikeClick = () => {
    if (token) {
      if (!like) {
        setLike(true);
        setLikeCounts((likeCounts) => likeCounts + 1);
        dispatch(fetchSetLike(slug));
      } else {
        setLike(false);
        setLikeCounts((likeCounts) => likeCounts - 1);
        dispatch(fetchDeleteLike(slug));
      }
    }
  };

  return (
    <li className={style.article}>
      <div className={style['article__left']}>
        <div>
          <Link to={`/articles/${slug}`} className={style['article__title']}>
            {getTrimText(title, 50) || 'No title'}
          </Link>
          <div className={style['article__like']}>
            <button className={style[likeButtonClass]} disabled={!token} onClick={toggleLikeClick}></button>
            <span className={style['article__heart-count']}>{likeCounts}</span>
          </div>
        </div>
        {tags}
        <p className={style['article__description']}>{getTrimText(description, 150) || 'No description'}</p>
      </div>
      <div className={style.userInfo}>
        <div>
          <p className={style['article__userName']}>{username || 'Anonymous>'}</p>
          <p className={style['article__date']}>{format(createdAt || Date.now(), 'MMMM d, yyyy')}</p>
        </div>
        <img className={style['article__avatar']} src={userAvatar} alt="avatar" />
      </div>
    </li>
  );
}
