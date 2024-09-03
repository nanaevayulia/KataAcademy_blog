import { Link } from 'react-router-dom';

import style from './header.module.scss';

const Header = () => {
  return (
    <header className={style.header}>
      <Link to="/" className={style['header__blog-name']}>
        Realworld Blog
      </Link>
      <div className={style['header__authorization']}>
        <button className={`${style.btn} ${style['btn__signIn']}`}>Sign In</button>
        <button className={`${style.btn} ${style['btn__signUp']}`}>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
