// src/components/layouts/Footer.js

import React from 'react';
import styles from '../../styles/Layout.module.css';

export default function Footer({ onContactClick }) {
  return (
    <footer className={styles.footer}>
      <p>© John@2025</p>
      <p>
        Have a suggestion?{' '}
        <button onClick={onContactClick} className={styles.footerLink}>Contact us</button>
      </p>
      <div className={styles.supportInfo}>
        Support us:
        <span className={styles.supportNumber}>0740297388
          <span className={styles.tooltip}>
            Why Support?<br />
            This project is a labor of love, built in my spare time. Your support helps keep the servers running and enables future development.
          </span>
          <span className={styles.questionMark}>
              ?
          </span>
        </span>
      </div>

    </footer>
  );
}