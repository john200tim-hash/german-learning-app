// This file seems to be a partial snippet. Assuming the full component structure.

import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../styles/Layout.module.css';

export default function SettingsModal({ isOpen, onClose }) {
    const { theme, cycleTheme, textSize, setTextSize, isColorBlend, setColorBlend } = useTheme();

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
                        <button onClick={cycleTheme} className={styles.toggleButton}>
                            {theme.charAt(0).toUpperCase() + theme.slice(1).replace('-', ' ')}
                        </button>
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

                    {/* Contact Section */}
                    <div className={styles.contactSection}>
                        <h4>Contact Us</h4>
                        <form onSubmit={handleSubmitContact} className={styles.contactForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="contact-email">Your Email</label>
                                <input
                                    type="email"
                                    id="contact-email"
                                    className={styles.formInput}
                                    value={senderEmail}
                                    onChange={(e) => setSenderEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="contact-message">Message</label>
                                <textarea
                                    id="contact-message"
                                    className={styles.formTextarea}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className={styles.formButton} disabled={contactStatus === 'sending'}>
                                {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
                            </button>
                            {contactStatus === 'success' && <p className={styles.contactSuccess}>Message sent!</p>}
                            {contactStatus === 'error' && <p className={styles.contactError}>Failed to send message.</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
