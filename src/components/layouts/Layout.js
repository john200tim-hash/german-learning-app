// src/components/layouts/Layout.js

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import SettingsModal from './SettingsModal';
import Footer from './Footer'; // Import the Footer component
import styles from '../../styles/Layout.module.css';

export default function Layout({ children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const [modalInitialTab, setModalInitialTab] = useState('settings');

    useEffect(() => {
        // Apply font size from localStorage on initial load
        const savedFontSize = localStorage.getItem('fontSize') || 'medium';
        document.documentElement.className = `font-size-${savedFontSize}`;

        // Optional: Listen for storage changes to update font size across tabs
        const handleStorageChange = () => {
            const newSize = localStorage.getItem('fontSize') || 'medium';
            document.documentElement.className = `font-size-${newSize}`;
        };
        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const openContactModal = () => {
        setModalInitialTab('contact');
        setSettingsOpen(true);
    };

    const openSupportModal = () => {
        setModalInitialTab('support');
        setSettingsOpen(true);
    };

    return (
        <div className={`${styles.appWrapper} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
            <Sidebar isOpen={isSidebarOpen} />
            {isSidebarOpen && <div className={styles.sidebarOverlay} onClick={toggleSidebar}></div>}

            <main className={styles.contentArea}>
                {children}
            </main>

            <button className={styles.hamburgerButton} onClick={toggleSidebar} aria-label="Open menu">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>

            <button className={`${styles.settingsButton} ${isSettingsOpen ? styles.settingsOpen : ''}`} onClick={() => setSettingsOpen(true)} aria-label="Open settings">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--heading-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
            </button>

            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => { setSettingsOpen(false); setModalInitialTab('settings'); }} // Reset tab on close
                initialTab={modalInitialTab}
            />
            <Footer onContactClick={openContactModal} onSupportClick={openSupportModal} />
        </div>
    );
}