import React from 'react';

import StarLogo from './img/star.svg';

import styles from './Rating.scss';

const Rating = ({ rating, theme = 'light' }) => (
  <div className={`${styles.rating} ${styles[`rating_theme_${theme}`]}`}>
    <StarLogo className={styles.starIcon} />
    <div className={styles.ratingNumber}>{rating}/5</div>
  </div>
);
export default Rating;
