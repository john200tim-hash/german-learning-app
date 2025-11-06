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
    </footer>
  );
}