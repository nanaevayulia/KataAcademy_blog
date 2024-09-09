import { Tag } from 'antd';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import getTrimText from '../../utils';
import heartNull from '../UI/heart_null.svg';
import heartRed from '../UI/heart_red.svg';

import style from './article-item.module.scss';

const ArticleItem = ({ title, description, tagList, createdAt, favoritesCount, favorited, author, slug }) => {
  const { username, image } = author;

  let userAvatar;
  if (image === undefined) {
    userAvatar = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  } else {
    userAvatar = image;
  }

  const filterTags = tagList && tagList.map((item) => getTrimText(item)).filter((item) => item || Math.abs(0));
  const tags = filterTags && (
    <div className={style['article__tags']}>
      {filterTags.map((item, i) => {
        return <Tag key={i}>{getTrimText(item, 15)}</Tag>;
      })}
    </div>
  );

  return (
    <li className={style.article}>
      <div className={style['article__left']}>
        <div>
          <Link to={`/articles/${slug}`} className={style['article__title']}>
            {getTrimText(title, 50) || 'No title'}
          </Link>
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
};

export default ArticleItem;
