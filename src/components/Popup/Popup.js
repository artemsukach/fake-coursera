import React, { useEffect, useState } from 'react';

import popupStyles from './Popup.scss';

const Popup = ({ className = '', onClose, show, children }) => {
  const [isShow, setIsShow] = useState(false);

  const closeHandler = () => {
    setIsShow(false);
    onClose(false);
  };

  useEffect(() => {
    setIsShow(show);
  }, [show]);

  return (
    <div
      style={{
        visibility: isShow ? 'visible' : 'hidden',
        opacity: isShow ? '1' : '0',
      }}
      className={`${popupStyles.overlay} ${className}`}
    >
      <div className={popupStyles.popup}>
        <div
          className={popupStyles.close}
          onClick={closeHandler}
          role="presentation"
        >
          &times;
        </div>
        <div className={popupStyles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Popup;
