import { Outlet } from 'react-router-dom';

import Header from '../header';

import style from './layout.module.scss';

const Layout = () => {
  return (
    <>
      <Header />
      <div className={style.container}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
