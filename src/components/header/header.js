import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUserLogOut } from '../../api/api_user';
import { appSelectors } from '../../redux';

import style from './header.module.scss';

export default function Header() {
  const dispatch = useDispatch();

  const user = useSelector(appSelectors.userObj);
  const username = user?.username ?? localStorage.getItem('username');
  const userAvatar = localStorage.getItem('image');
  const pic = userAvatar === '' ? 'https://static.productionready.io/images/smiley-cyrus.jpg' : userAvatar;

  const articlesLoading = useSelector(appSelectors.loading);
  const loading = articlesLoading ?? user.loading;

  const onLogout = () => {
    localStorage.clear();
    dispatch(fetchUserLogOut());
    window.location.reload();
  };

  return (
    <header className={style.header}>
      {!username ? (
        <>
          <Link to="/" className={style['header__blog-name']}>
            Realworld Blog
          </Link>
          <div className={style['header__authorization']}>
            <Link to="/sign-in" className={`${style.btn} ${style['btn__signIn']}`}>
              Sign In
            </Link>
            <Link to="/sign-up" className={`${style.btn} ${style['btn__signUp']}`}>
              Sign Up
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link to="/" className={style['header__blog-name']}>
            Realworld Blog
          </Link>
          <div className={style['header__authorization']}>
            <Link to="/new-article" className={`${style.btn} ${style['btn__create-article']}`}>
              Create article
            </Link>
            <Link to="/profile" className={style['header__user']}>
              <span>{username}</span>
              <img className={style['header__avatar']} src={pic} alt="avatar" />
            </Link>
            <button className={`${style.btn} ${style['btn__logOut']}`} disabled={loading} onClick={onLogout}>
              Log Out
            </button>
          </div>
        </>
      )}
    </header>
  );
}
