// src/components/layouts/Footer.js

import React from 'react';
import styles from '../../styles/Layout.module.css';

export default function Footer({ onContactClick, onSupportClick }) {
  return (
      <footer className={styles.footer}>
      <p>© John@2025</p>
      <div className={styles.footerLinks}>
        <p>Have a suggestion or feedback? <button onClick={onContactClick} className={styles.footerLink}>Contact Us</button></p>
        <p>
          Need help or want to contribute? <button onClick={onSupportClick} className={styles.footerLink}>Get Support</button> or call <span className={styles.supportNumber}>+254740292388</span>
        </p>
      </div>

    </footer>
  );
}