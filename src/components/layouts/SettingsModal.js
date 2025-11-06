// This file seems to be a partial snippet. Assuming the full component structure.

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../styles/Layout.module.css';

export default function SettingsModal({ isOpen, onClose, initialTab = 'settings' }) {
    const { theme, handleThemeChange, textSize, setTextSize, isColorBlend, setColorBlend, colorMode, handleColorModeChange } = useTheme();

    // State for tabs
    const [activeTab, setActiveTab] = useState(initialTab);

    // Update the active tab if the initialTab prop changes while the modal is open
    useEffect(() => {
        if (isOpen) setActiveTab(initialTab);
    }, [initialTab, isOpen]);

    // State for contact form
    const [senderEmail, setSenderEmail] = useState('');
    const [message, setMessage] = useState('');
    const [contactStatus, setContactStatus] = useState(''); // 'success', 'error', 'sending', ''

    if (!isOpen) {
        return null;
    }

    const handleSubmitContact = async (e) => {
        e.preventDefault();
        setContactStatus('sending');

        if (!senderEmail || !message) {
            setContactStatus('error');
            return;
        }

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ senderEmail, message }),
            });

            const data = await res.json();
            if (res.ok) {
                setContactStatus('success');
                setSenderEmail('');
                setMessage('');
            } else {
                setContactStatus('error');
            }
        } catch (error) {
            setContactStatus('error');
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>Settings</h3>
                    <button onClick={onClose} className={styles.closeButton} aria-label="Close settings">&times;</button>
                </div>

                {/* Tab Navigation */}
                <div className={styles.subTabs}>
                    <button
                        className={`${styles.subTabBtn} ${activeTab === 'settings' ? styles.activeSubTab : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >Settings</button>
                    <button
                        className={`${styles.subTabBtn} ${activeTab === 'contact' ? styles.activeSubTab : ''}`}
                        onClick={() => setActiveTab('contact')}
                    >Contact</button>
                </div>

                {activeTab === 'settings' && (
                    <div className={styles.modalBody}>
                        {/* Text Size Setting */}
                        <div className={styles.settingRow}>
                            <label id="text-size-label">Text Size</label>
                            <div role="group" aria-labelledby="text-size-label" className={styles.segmentedControl}>
                                <button onClick={() => setTextSize('sm')} className={textSize === 'sm' ? styles.activeSegment : ''}>S</button>
                                <button onClick={() => setTextSize('base')} className={textSize === 'base' ? styles.activeSegment : ''}>M</button>
                                <button onClick={() => setTextSize('lg')} className={textSize === 'lg' ? styles.activeSegment : ''}>L</button>
                                <button onClick={() => setTextSize('xl')} className={textSize === 'xl' ? styles.activeSegment : ''}>XL</button>
                                <button onClick={() => setTextSize('xxl')} className={textSize === 'xxl' ? styles.activeSegment : ''}>XXL</button>
                            </div>
                        </div>

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

                        {/* Color Mode Setting */}
                        <div className={styles.settingRow}>
                            <label id="color-mode-label">Color Palette</label>
                            <div role="group" aria-labelledby="color-mode-label" className={styles.segmentedControl}>
                                <button
                                    onClick={() => handleColorModeChange('A')}
                                    className={colorMode === 'A' ? styles.activeSegment : ''}
                                >A</button>
                                <button
                                    onClick={() => handleColorModeChange('B')}
                                    className={colorMode === 'B' ? styles.activeSegment : ''}
                                >B</button>
                                <button
                                    onClick={() => handleColorModeChange('C')}
                                    className={colorMode === 'C' ? styles.activeSegment : ''}
                                >C</button><button
                                    onClick={() => handleColorModeChange('D')}
                                    className={colorMode === 'D' ? styles.activeSegment : ''}
                                >D</button>
                            </div>
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
                )}

                {activeTab === 'contact' && (
                    <div className={styles.modalBody}>
                        {/* Contact Section */}
                        <div className={styles.contactSection}>
                            <form onSubmit={handleSubmitContact} className={styles.contactForm}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="contact-email">Your Email</label>
                                    <input type="email" id="contact-email" className={styles.formInput} value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="contact-message">Message</label> 
                                    <textarea id="contact-message" className={styles.formTextarea} value={message} onChange={(e) => setMessage(e.target.value)} rows="4" required ></textarea>
                                </div>
                                <button type="submit" className={styles.formButton} disabled={contactStatus === 'sending'}>
                                    {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
                                </button>
                                {contactStatus === 'success' && <p className={styles.contactSuccess}>Message sent! Thank you.</p>}
                                {contactStatus === 'error' && <p className={styles.contactError}>Failed to send message. Please try again later.</p>}
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
