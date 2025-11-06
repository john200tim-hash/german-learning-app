// src/components/layouts/Footer.js

import React from 'react';
import styles from '../../styles/Layout.module.css';

export default function Footer({ onContactClick, onSupportClick }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p>
                &copy; {currentYear} German Learning App. All Rights Reserved. | Support:
                <span className={styles.supportNumber}>0740292388</span>
            </p>
            <div className={styles.footerLinks}>
                <button onClick={onContactClick} className={styles.footerLink}>
                    Contact Us
                </button>
                <button onClick={onSupportClick} className={styles.footerLink}>
                    Support Us
                </button>
            </div>
        </footer>
    );
}