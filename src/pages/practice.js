// src/pages/practice.js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.css';

import IndefiniteWordsQuiz from '../components/practice/IndefiniteWordsQuiz';
import PassiveSubstitutesQuiz from '../components/practice/PassiveSubstitutesQuiz';

const practiceTabs = {
    'indefinite-words-quiz': { label: 'Indefinite Words Quiz', component: IndefiniteWordsQuiz },
    'passive-substitutes-quiz': { label: 'Passive Substitutes Quiz', component: PassiveSubstitutesQuiz },
};

export default function PracticePage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(Object.keys(practiceTabs)[0]);

    useEffect(() => {
        const tabFromQuery = router.query.tab;
        if (router.isReady && tabFromQuery && practiceTabs[tabFromQuery]) {
            setActiveTab(tabFromQuery);
        }
    }, [router.isReady, router.query.tab]);

    const ActiveComponent = practiceTabs[activeTab]?.component;

    const handleTabClick = (tabKey) => {
        setActiveTab(tabKey);
        router.push({
            pathname: '/practice',
            query: { tab: tabKey },
        }, undefined, { shallow: true });
    };

    return (
        <div>
            <h1>Practice</h1>
            <p>Test your knowledge with interactive quizzes.</p>

            <div className={styles.subTabsWrapper}>
                <div className={styles.subTabs}>
                    {Object.keys(practiceTabs).map((tabKey) => (
                        <button key={tabKey} className={`${styles.subTabBtn} ${activeTab === tabKey ? styles.activeSubTab : ''}`} onClick={() => handleTabClick(tabKey)}>
                            {practiceTabs[tabKey].label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                {ActiveComponent && <ActiveComponent />}
            </div>
        </div>
    );
}