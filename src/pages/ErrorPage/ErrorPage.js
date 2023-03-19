import React from 'react';
import { NavLink, useNavigation } from 'react-router-dom';

import Spinner from '../../components/Spinner/Spinner';

import styles from './ErrorPage.scss';

const NotFoundPage = () => {
  const { state } = useNavigation();

  return (
    <div className={styles.errorPage}>
      <div className={styles.errorPage__titleWrapper}>
        <h1 className={styles.errorPage__title}>Error 404</h1>
      </div>
      <NavLink className={styles.errorPage__goBackButton} to="/courses">
        Go Home
      </NavLink>
      {state === 'loading' && <Spinner />}
    </div>
  );
};

export default NotFoundPage;
