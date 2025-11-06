// src/components/layouts/Layout.js

import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import Footer from './Footer';
import Sidebar from './Sidebar';
import SettingsModal from './SettingsModal';
import styles from '../../styles/Layout.module.css';

/**
 * Reusable shell for all pages. [1]
 */
export default function Layout({ children }) {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [initialModalTab, setInitialModalTab] = useState('settings');
  const [isMobile, setIsMobile] = useState(false); // New state to track mobile view

  // Ref for the main content area to detect clicks outside sidebar
  // This ref is also used for attaching touch event listeners for swipe gestures.
  const mainContentRef = useRef(null);

  const openContactModal = () => {
    setInitialModalTab('contact');
    setSettingsOpen(true);
  };

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Assuming 1024px as desktop breakpoint
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true); // Always open sidebar on desktop
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar if clicked outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Only close if it's mobile and sidebar is open, and the click is outside the sidebar and hamburger
      if (isMobile && isSidebarOpen && !e.target.closest(`.${styles.sidebarContainer}`) && !e.target.closest(`.${styles.hamburgerButton}`)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  return (
    <div className={`${styles.appWrapper} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
      {/* Settings Button - always visible, fixed position */}
      <button className={styles.settingsButton} onClick={() => setSettingsOpen(true)} aria-label="Open settings">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
      </button>

      {/* Hamburger Button - only visible on mobile */}
      {isMobile && (
        <button className={styles.hamburgerButton} onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      )}

      {/* Overlay for mobile sidebar */}
      {isMobile && isSidebarOpen && (
        <div className={styles.sidebarOverlay} onClick={toggleSidebar}></div>
      )}

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)} initialTab={initialModalTab} />

      <div className={styles.mainContainer}>
        <Sidebar isOpen={isSidebarOpen} />
        <main ref={mainContentRef} className={styles.contentArea}>{children}</main>
      </div>
      <Footer onContactClick={openContactModal} />
    </div>
  );
}