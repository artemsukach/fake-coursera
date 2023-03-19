import React, { useState } from 'react';

import Popup from '../Popup/Popup';
import Video from '../Video/Video';

import LockLogo from './img/lock.svg';

import styles from './Lesson.scss';

const Lesson = ({ lesson }) => {
  const { id, order, title, status, link } = lesson;
  const [showPopup, setShowPopup] = useState(false);
  const isLocked = status === 'locked';

  return (
    <>
      <div
        className={`${styles.lesson} ${isLocked ? styles.lesson__locked : ''}`}
        onClick={() => {
          if (!isLocked) setShowPopup(true);
        }}
        role="presentation"
      >
        <p className={styles.lesson__title}>
          Lesson {order}. {title}
        </p>
        {isLocked && <LockLogo className={styles.lesson__lockIcon} />}
      </div>
      {showPopup && (
        <Popup
          className={styles.lesson__popup}
          show={showPopup}
          onClose={() => setShowPopup(false)}
        >
          <Video id={id} videoLink={link} />
          <h2 className={styles.lesson__popupTitle}>
            Lesson {order}. {title}
          </h2>
        </Popup>
      )}
    </>
  );
};
export default Lesson;
