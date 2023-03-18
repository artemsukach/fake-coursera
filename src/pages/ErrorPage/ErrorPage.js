import React from 'react';

import { useRouteError } from 'react-router-dom';

import styles from './ErrorPage.scss';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      <header>
        <div className={styles.container}>
          <h1 className={styles.title}>Fake Coursera</h1>
        </div>
      </header>
      <main>
        <div className={styles.container}>
          <div className={styles.error}>
            <h1 className={styles.error__title}>Looks like you got lost!</h1>
            <p className={styles.error__description}>
              Couldn’t find the page you were looking for.
            </p>
            {error.statusText && (
              <p className={styles.error__status}>{error.message}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
