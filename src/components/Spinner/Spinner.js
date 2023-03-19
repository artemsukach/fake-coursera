import React from 'react';

import styles from './Spinner.scss';

const Spinner = () => (
  <div
    style={{
      visibility: 'visible',
      opacity: '1',
    }}
    className={styles.overlay}
  >
    <div className={styles.spinner} />
  </div>
);

export default Spinner;
