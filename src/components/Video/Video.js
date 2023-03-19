import Hls from 'hls.js';
import React, { useEffect, useRef, useState } from 'react';
import { useBeforeUnload } from 'react-router-dom';

import { useKeyDown } from '../../../hooks/useKeyDown';
import { KEY_PLAYBACK_RATE } from '../../../utils/constants';

import VolumeLogo from './img/volume.svg';

import styles from './Video.scss';

const Video = ({ id, isCardVideo = false, videoLink, previewImageLink }) => {
  const [showPreview, setShowPreview] = useState(true);
  const [isMutedVideo, setIsMutedVideo] = useState(isCardVideo);
  const [canPlay, setCanPlay] = useState(true);
  const video = useRef(null);

  const changePlaybackRate = (pressedKey) => {
    switch (pressedKey) {
      case 'u':
        if (video.current.playbackRate > 0.25) {
          video.current.playbackRate -= 0.25;
        }
        break;

      case 'i':
        if (video.current.playbackRate < 4) {
          video.current.playbackRate += 0.25;
        }
        break;

      default:
        break;
    }
  };

  useKeyDown((pressedKey) => {
    changePlaybackRate(pressedKey);
  }, KEY_PLAYBACK_RATE);

  const saveVideoProgress = (video, id) => {
    if (id) localStorage.setItem(id, video.currentTime);
  };

  useBeforeUnload(() => {
    saveVideoProgress(video.current, id);
  });

  const stopVideo = () => {
    if (canPlay) setShowPreview((prevState) => !prevState);

    video.current.pause();
  };

  const playVideo = () => {
    video.current.play();
  };

  const onEndedLoop = () => {
    if (isCardVideo && !showPreview) playVideo();
  };

  const toggleVolumeVideo = (event) => {
    event.stopPropagation();
    setIsMutedVideo((prevState) => !prevState);
  };

  const togglePreview = () => {
    if (canPlay) {
      setShowPreview((prevState) => !prevState);
    }
  };

  const getHoverListeners = () => {
    if (isCardVideo) {
      return {
        onMouseEnter: togglePreview,
        onMouseLeave: stopVideo,
      };
    }

    return {};
  };

  useEffect(() => {
    const videoRef = video.current;

    if (Hls.isSupported() && video.current) {
      const config = {
        startPosition: Number(localStorage.getItem(id)),
      };

      const hls = new Hls(config);

      hls.loadSource(videoLink);
      hls.attachMedia(video.current);

      hls.on(Hls.Events.ERROR, () => {
        setCanPlay((prevState) => !prevState);
      });
    }

    return () => {
      saveVideoProgress(videoRef, id);
    };
  }, []);

  return (
    <div className={styles.video__media} {...getHoverListeners()}>
      {isCardVideo && canPlay && (
        <p
          className={`${styles.video__hoverHint} ${
            !showPreview ? styles.video__hoverHint_hidden : ''
          }`}
        >
          Hover to play
        </p>
      )}
      {isCardVideo && (
        <img
          className={`${styles.video__videoPreview} ${
            !showPreview ? styles.video__videoPreview_hidden : ''
          }`}
          onAnimationEnd={playVideo}
          src={`${previewImageLink}/cover.webp`}
          alt="Course prewiev"
        />
      )}
      <video
        className={styles.video__video}
        preload="metadata"
        muted={isMutedVideo}
        ref={video}
        // onProgress={handleProgress}
        onEnded={onEndedLoop}
        controls={!isCardVideo}
      />
      {isCardVideo && !showPreview && (
        <div
          className={`${styles.video__volume} ${
            isMutedVideo ? styles.video__volume_muted : ''
          }`}
          onClick={toggleVolumeVideo}
          role="presentation"
        >
          <VolumeLogo className={styles.video__volumeIcon} />
        </div>
      )}
    </div>
  );
};

export default Video;
