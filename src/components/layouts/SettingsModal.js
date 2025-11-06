// This file seems to be a partial snippet. Assuming the full component structure.

import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { useForm, ValidationError } from '@formspree/react';
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

    // Formspree hook, using your unique endpoint ID.
    const [state, handleSubmit, resetForm] = useForm("meopylpb"); // Added resetForm

    if (!isOpen) {
        return null;
    }

    // Function to handle returning to settings after successful submission
    const handleReturnToSettings = useCallback(() => {
        resetForm(); // Reset the form state
        setActiveTab('settings'); // Switch back to settings tab
    }, [resetForm]);

    // Effect to reset form state when modal closes or tab changes from contact
    useEffect(() => {
        if (!isOpen || activeTab !== 'contact') {
            resetForm();
        }
    }, [isOpen, activeTab, resetForm]);

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
                            <form onSubmit={handleSubmit} className={styles.contactForm}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="contact-email">Your Reply-To Email</label>
                                    <input type="email" id="contact-email" name="email" className={styles.formInput} required />
                                    <ValidationError 
                                        prefix="Email" 
                                        field="email"
                                        errors={state.errors}
                                        className={styles.contactError}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="contact-message">Message</label> 
                                    <textarea id="contact-message" name="message" className={styles.formTextarea} rows="4" required ></textarea>
                                    <ValidationError 
                                        prefix="Message" 
                                        field="message"
                                        errors={state.errors}
                                        className={styles.contactError}
                                    />
                                </div>
                                <button type="submit" className={styles.formButton} disabled={state.submitting}>
                                    Send Message
                                </button>
                                {state.succeeded && (
                                    <p className={styles.contactSuccess}>Message sent! Thank you.</p>
                                )}
                                {state.errors && state.errors.length > 0 && (
                                    <p className={styles.contactError}>Failed to send message. Please check your input.</p>
                                )}
                            </form>
                            {state.succeeded && (
                                <button onClick={handleReturnToSettings} className={styles.formButton}>Back to Settings</button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
