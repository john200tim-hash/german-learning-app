// src/components/layouts/SupportPopup.js
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Layout.module.css';

export default function SupportPopup({ onContactClick }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFlashing, setIsFlashing] = useState(true);

  useEffect(() => {
    // Make it flash for a bit
    const flashTimer = setTimeout(() => {
      setIsFlashing(false);
    }, 5000); // Flash for 5 seconds

    // Then make it disappear
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); // Disappear after 10 seconds

    return () => {
      clearTimeout(flashTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`${styles.supportPopup} ${isFlashing ? styles.flashing : ''}`} onClick={onContactClick}>
      <p>Having trouble or suggestions? Click here for support!</p>
    </div>
  );
}