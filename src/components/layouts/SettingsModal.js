// src/components/layouts/SettingsModal.js

import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../styles/Layout.module.css';

export default function SettingsModal({ isOpen, onClose }) {
    const { theme, setTheme, textSize, setTextSize, isColorBlend, setColorBlend } = useTheme();

    if (!isOpen) return null;

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>Settings</h3>
                    <button onClick={onClose} className={styles.closeButton} aria-label="Close settings">&times;</button>
                </div>
                <div className={styles.modalBody}>
                    {/* Text Size Setting */}
                    <div className={styles.settingRow}>
                        <label id="text-size-label">Text Size</label>
                        <div role="group" aria-labelledby="text-size-label" className={styles.segmentedControl}>
                            <button onClick={() => setTextSize('sm')} className={textSize === 'sm' ? styles.activeSegment : ''}>S</button>
                            <button onClick={() => setTextSize('base')} className={textSize === 'base' ? styles.activeSegment : ''}>M</button>
                            <button onClick={() => setTextSize('lg')} className={textSize === 'lg' ? styles.activeSegment : ''}>L</button>
                        </div>
                    </div>

                    {/* Dark Mode Toggle */}
                    <div className={styles.settingRow}>
                        <label htmlFor="dark-mode-toggle">Dark Mode</label>
                        <label className={styles.toggleSwitch}>
                            <input
                                type="checkbox"
                                id="dark-mode-toggle"
                                checked={theme === 'dark'}
                                onChange={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    {/* High Contrast Toggle */}
                    <div className={styles.settingRow}>
                        <label htmlFor="high-contrast-toggle">High Contrast Mode</label>
                        <label className={styles.toggleSwitch}>
                            <input
                                type="checkbox"
                                id="high-contrast-toggle"
                                checked={theme === 'high-contrast'}
                                onChange={() => handleThemeChange(theme === 'high-contrast' ? 'light' : 'high-contrast')}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    {/* Color Blending Toggle */}
                    <div className={styles.settingRow}>
                        <label htmlFor="color-blend-toggle">Vocabulary Color Blending</label>
                        <label className={styles.toggleSwitch}>
                            <input
                                type="checkbox"
                                id="color-blend-toggle"
                                checked={isColorBlend}
                                onChange={() => setColorBlend(!isColorBlend)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}