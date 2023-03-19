import React from 'react';

import styles from './Skills.scss';

const Skills = ({ skills, viewCount }) => {
  const overflowStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: viewCount,
    WebkitBoxOrient: 'vertical',
  };

  return (
    <ul
      className={styles.skills}
      {...(viewCount ? { style: overflowStyle } : {})}
    >
      {skills.map((skill) => (
        <li className={styles.skills__item} key={skill}>
          {skill}
        </li>
      ))}
    </ul>
  );
};
export default Skills;
