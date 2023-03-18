import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

import StarLogo from './img/star.svg';
import VolumeLogo from './img/volume.svg';

import styles from './CourseCard.scss';

const CourseCard = ({ course }) => {
  const {
    lessonsCount = '-',
    rating = '-',
    title = '',
    description = '',
    previewImageLink,
    meta: { skills = [], courseVideoPreview: { link = '' } = {} },
  } = course;

  const [showPreview, setShowPreview] = useState(true);
  const [isMutedVideo, setIsMutedVideo] = useState(true);
  const [canPlay, setCanPlay] = useState(true);
  const video = useRef(null);

  const getSkillsList = (skills) => {
    let newSkillsList = skills;

    if (skills.length > 5) {
      newSkillsList = newSkillsList.slice(0, 4);
      newSkillsList.push('...');
    }

    return (
      <ul className={`${styles.courseCard__skills}`}>
        {newSkillsList.map((skill) => (
          <li className={styles.courseCard__skillsItem} key={skill}>
            {skill}
          </li>
        ))}
      </ul>
    );
  };

  const pluralize = (count, noun, suffix = 's') =>
    `${count} ${noun}${count !== 1 ? suffix : ''}`;

  const stopVideo = () => {
    if (canPlay) setShowPreview((prevState) => !prevState);

    video.current.pause();
  };

  const playVideo = () => {
    video.current.play();
  };

  const toggleVolumeVideo = () => {
    setIsMutedVideo((prevState) => !prevState);
  };

  const togglePreview = () => {
    if (canPlay) setShowPreview((prevState) => !prevState);
  };

  const loop = () => {
    video.current.play();
  };

  const onEndedLoop = () => {
    if (!showPreview) loop();
  };

  useEffect(() => {
    if (Hls.isSupported() && video.current) {
      const hls = new Hls();

      hls.loadSource(link);
      hls.attachMedia(video.current);

      hls.on(Hls.Events.ERROR, () => {
        setCanPlay((prevState) => !prevState);
      });
    }
  }, []);

  return (
    <div className={styles.courseCard}>
      <div className={styles.courseCard__cover}>
        <div
          className={styles.courseCard__media}
          onMouseEnter={togglePreview}
          onMouseLeave={stopVideo}
        >
          {canPlay && (
            <p
              className={`${styles.courseCard__hoverHint} ${
                !showPreview ? styles.courseCard__hoverHint_hidden : ''
              }`}
            >
              Hover to play
            </p>
          )}
          <img
            className={`${styles.courseCard__videoPreview} ${
              !showPreview ? styles.courseCard__videoPreview_hidden : ''
            }`}
            onAnimationEnd={playVideo}
            src={`${previewImageLink}/cover.webp`}
            alt="Course prewiev"
          />
          <video
            className={styles.courseCard__video}
            preload="metadata"
            muted={isMutedVideo}
            ref={video}
            onEnded={onEndedLoop}
          />
          {!showPreview && (
            <div
              className={`${styles.courseCard__volume} ${
                isMutedVideo ? styles.courseCard__volume_muted : ''
              }`}
              onClick={toggleVolumeVideo}
              role="presentation"
            >
              <VolumeLogo className={styles.courseCard__volumeIcon} />
            </div>
          )}
        </div>
        <div className={styles.courseCard__details}>
          <div className={styles.courseCard__topInfo}>
            <div className={styles.courseCard__lessonCount}>
              {pluralize(lessonsCount, 'lesson')}
            </div>
            <div className={styles.courseCard__rating}>
              <StarLogo className={styles.courseCard__starIcon} />
              <div className={styles.courseCard__ratingNumber}>{rating}/5</div>
            </div>
          </div>
          <h2 className={styles.courseCard__title}>{title}</h2>
          <p className={styles.courseCard__description}>{description}</p>
          {getSkillsList(skills)}
        </div>
      </div>
    </div>
  );
};
export default CourseCard;
