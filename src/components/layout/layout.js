import { Outlet } from 'react-router-dom';

import Header from '../header';

import style from './layout.module.scss';

export default function Layout() {
  return (
    <>
      <Header />
      <div className={style.container}>
        <Outlet />
      </div>
    </>
  );
}
