// src/pages/practice.js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.css';

// Import practice components
import PassivePractice from '../components/practice/PassivePractice'; // Corrected path

const practiceTabs = {
    'passive-practice': { label: 'Passive Substitutes', component: PassivePractice },
    // Future practice modules will be added here
};

export default function PracticePage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(Object.keys(practiceTabs)[0]);

    useEffect(() => {
        if (router.isReady && router.query.tab) {
            const tabFromQuery = router.query.tab;
            if (practiceTabs[tabFromQuery]) {
                setActiveTab(tabFromQuery);
            }
        }
    }, [router.isReady, router.query.tab]);

    const ActiveComponent = practiceTabs[activeTab]?.component;

    return (
        <div>
            <h1>Practice Exercises</h1>
            <p>Test your knowledge with interactive quizzes.</p>

            <div className={styles.subTabs}>
                {Object.keys(practiceTabs).map((tabKey) => (
                    <button
                        key={tabKey}
                        className={`${styles.subTabBtn} ${activeTab === tabKey ? styles.activeSubTab : ''}`}
                        onClick={() => setActiveTab(tabKey)}
                    >
                        {practiceTabs[tabKey].label}
                    </button>
                ))}
            </div>

            <div>
                {ActiveComponent && <ActiveComponent />}
            </div>
        </div>
    );
}