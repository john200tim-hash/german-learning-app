// src/components/layouts/Footer.js

import React from 'react';
import styles from '../../styles/Layout.module.css';

export default function Footer({ onContactClick, onSupportClick }) {
  return (
      <footer className={styles.footer}>
      <p>© John@2025</p>
      <div className={styles.footerSupport}>
        <button onClick={onSupportClick} className={styles.footerLink}>
          Support us
        </button>
        <span className={styles.supportNumber}>
          +254740292388

          <span className={styles.questionMark}>
              ?
          </span>
        </span>
      </div>

    </footer>
  );
}