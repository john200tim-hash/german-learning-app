// src/components/layouts/SettingsModal.js

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../styles/Layout.module.css';

export default function SettingsModal({ isOpen, onClose, initialTab }) {
    const {
        theme, setTheme,
        textSize, setTextSize,
        colorMode, setColorMode,
        isColorBlend, setColorBlend
    } = useTheme();

    const [activeTab, setActiveTab] = useState(initialTab || 'settings');
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

    useEffect(() => {
        setActiveTab(initialTab);
        // Reset form when tab changes
        setSubmissionStatus('idle');
    }, [initialTab, isOpen]);

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormState(prevState => ({ ...prevState, [id]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('submitting');

        try {
            const response = await fetch('https://formspree.io/f/meopylpb', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: JSON.stringify(formState)
            });

            if (response.ok) {
                setSubmissionStatus('success');
                setFormState({ name: '', email: '', message: '' }); // Clear form
            } else {
                setSubmissionStatus('error');
            }
        } catch (error) {
            setSubmissionStatus('error');
        } finally {
            // Reset form after 2 seconds to allow another message
            setTimeout(() => setSubmissionStatus('idle'), 2000);
        }
    };

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
                    <button onClick={onClose} className={styles.closeButton} aria-label="Close settings">&times;</button>
                </div>

                <div className={styles.subTabs}>
                    <button
                        className={`${styles.subTabBtn} ${activeTab === 'settings' ? styles.activeSubTab : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >Settings</button>
                    <button
                        className={`${styles.subTabBtn} ${activeTab === 'contact' ? styles.activeSubTab : ''}`}
                        onClick={() => setActiveTab('contact')}
                    >Contact</button>
                    <button
                        className={`${styles.subTabBtn} ${activeTab === 'support' ? styles.activeSubTab : ''}`}
                        onClick={() => setActiveTab('support')}
                    >Support</button>
                </div>

                {activeTab === 'settings' && (
                    <div className={styles.modalBody}>
                        {/* Text Size Setting */}
                        <div className={styles.settingRow}>
                            <label id="text-size-label">Text Size</label>
                            <div role="group" aria-labelledby="text-size-label" className={styles.segmentedControl}>
                                <button onClick={() => setTextSize('small')} className={textSize === 'small' ? styles.activeSegment : ''}>S</button>
                                <button onClick={() => setTextSize('medium')} className={textSize === 'medium' ? styles.activeSegment : ''}>M</button>
                                <button onClick={() => setTextSize('large')} className={textSize === 'large' ? styles.activeSegment : ''}>L</button>
                            </div>
                        </div>

                        {/* Theme Selection */}
                        <div className={styles.settingRow}>
                            <label id="theme-label">Theme</label>
                            <div role="group" aria-labelledby="theme-label" className={styles.segmentedControl}>
                                <button onClick={() => handleThemeChange('light')} className={theme === 'light' ? styles.activeSegment : ''}>Light</button>
                                <button onClick={() => handleThemeChange('dark')} className={theme === 'dark' ? styles.activeSegment : ''}>Dark</button>
                                <button onClick={() => handleThemeChange('high-contrast')} className={theme === 'high-contrast' ? styles.activeSegment : ''}>Contrast</button>
                            </div>
                        </div>

                        {/* Color Mode Selection */}
                        <div className={styles.settingRow}>
                            <label id="color-mode-label">Color Mode</label>
                            <div role="group" aria-labelledby="color-mode-label" className={styles.segmentedControl}>
                                <button onClick={() => setColorMode('a')} className={colorMode === 'a' ? styles.activeSegment : ''}>A</button>
                                <button onClick={() => setColorMode('b')} className={colorMode === 'b' ? styles.activeSegment : ''}>B</button>
                                <button onClick={() => setColorMode('c')} className={colorMode === 'c' ? styles.activeSegment : ''}>C</button>
                                <button onClick={() => setColorMode('d')} className={colorMode === 'd' ? styles.activeSegment : ''}>D</button>
                            </div>
                        </div>

                        {/* Color Blend Toggle */}
                        <div className={styles.settingRow}>
                            <label htmlFor="color-blend-toggle">Color Blend</label>
                            <label className={styles.toggleSwitch}>
                                <input
                                    type="checkbox"
                                    id="color-blend-toggle"
                                    checked={isColorBlend}
                                    onChange={(e) => setColorBlend(e.target.checked)}
                                />
                                <span className={styles.slider}></span>
                            </label>
                        </div>
                    </div>
                )}

                {activeTab === 'contact' && (
                    <>
                        {submissionStatus === 'idle' || submissionStatus === 'submitting' ? (
                            <div className={styles.contactSection}>
                                <h4>Get in Touch</h4>
                                <form className={styles.contactForm} onSubmit={handleFormSubmit}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" value={formState.name} onChange={handleFormChange} className={styles.formInput} required />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" value={formState.email} onChange={handleFormChange} className={styles.formInput} required />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="message">Message</label>
                                        <textarea id="message" name="message" rows="4" value={formState.message} onChange={handleFormChange} className={styles.formTextarea} required></textarea>
                                    </div>
                                    <button type="submit" className={styles.formButton} disabled={submissionStatus === 'submitting'}>
                                        {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        ) : submissionStatus === 'success' ? (
                            <div className={styles.contactSuccess}>
                                <h4>Message Sent!</h4>
                            </div>
                        ) : (
                            <div className={styles.contactError}>
                                <h4>Something went wrong.</h4>
                                <p>Please try again later.</p>
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'support' && (
                    <div className={styles.supportSection}>
                        <h4>Support Us</h4>
                        <p>
                            If you find this application helpful, please consider supporting its development. Your contribution helps us improve features and keep the app running.
                        </p>
                        <p>You can donate (support) to the number below:</p>
                        <div className={styles.donationNumber}>
                            0740292388
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
