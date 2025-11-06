// src/components/layouts/SettingsModal.js

import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../styles/Layout.module.css';

export default function SettingsModal({ isOpen, onClose }) {
    const { theme, handleThemeChange } = useTheme();

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>Settings</h3>
                    <button onClick={onClose} className={styles.closeButton} aria-label="Close settings">&times;</button>
                </div>
                <div className={styles.modalBody}>
                    {/* Theme Selection */}
                    <div className={styles.settingRow}>
                        <label id="theme-label">Theme</label>
                        <div role="group" aria-labelledby="theme-label" className={styles.segmentedControl}>
                            <button
                                onClick={() => handleThemeChange('light')}
                                className={theme === 'light' ? styles.activeSegment : ''}
                            >Light</button>
                            <button
                                onClick={() => handleThemeChange('dark')}
                                className={theme === 'dark' ? styles.activeSegment : ''}
                            >Dark</button>
                            <button
                                onClick={() => handleThemeChange('high-contrast')}
                                className={theme === 'high-contrast' ? styles.activeSegment : ''}
                            >Contrast</button>
                        </div>
                    </div>

                    {/* Placeholder for other settings like text size if you add them back */}

                </div>
            </div>
        </div>
    );
}
