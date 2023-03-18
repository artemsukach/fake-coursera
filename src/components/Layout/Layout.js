import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Layout.scss';

const Layout = () => (
  <>
    <header>
      <div className={styles.container}>
        <h1 className={styles.title}>Fake Coursera</h1>
      </div>
    </header>
    <main>
      <div className={styles.container}>
        <Outlet />
      </div>
    </main>
  </>
);

export default Layout;
