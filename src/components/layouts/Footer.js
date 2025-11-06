// src/components/layouts/Footer.js

import React from 'react';
import styles from '../../styles/Layout.module.css';

export default function Footer({ onContactClick, onSupportClick }) {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerRow}>
                    <span>Have a suggestion or feedback?</span>
                    <button onClick={onContactClick} className={styles.footerLink}>Contact Us</button>
                </div>
                <div className={styles.footerRow}>
                    <span>Need help or want to contribute?</span>
                    <button onClick={onSupportClick} className={styles.footerLink}>Get Support</button>
                    <span className={styles.footerSeparator}>or call</span>
                    <a href="tel:+254740292388" className={styles.footerPhone}>+254740292388</a>
                </div>
            </div>
            <p className={styles.copyrightText}>
                © John@2025
            </p>
        </footer>
    );
}
