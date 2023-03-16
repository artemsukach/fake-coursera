import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Layout.scss';

const Layout = () => (
  <>
    <header>
      <h1 className={styles.title}>title</h1>
    </header>
    <main>
      <Outlet />
    </main>
    <footer>
      <p className={styles.footer__text}>footer</p>
    </footer>
  </>
);

export default Layout;
