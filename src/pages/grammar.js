// src/pages/grammar.js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.css';

// Import the new components
import IndefiniteWords from '../components/grammar/IndefiniteWords';
import Pronouns from '../components/grammar/Pronouns';
import PassiveSubstitutes from '../components/grammar/PassiveSubstitutes';

const grammarTabs = {
    'indefinite-words': { label: 'Indefinite Words', component: IndefiniteWords },
    pronouns: { label: 'Pronouns', component: Pronouns },
    'passive-substitutes': { label: 'Passive Substitutes', component: PassiveSubstitutes },
};

export default function GrammarPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(Object.keys(grammarTabs)[0]);
    useEffect(() => {
        // Check for a tab in the URL query on initial load
        if (router.isReady && router.query.tab) {
            const tabFromQuery = router.query.tab;
            if (grammarTabs[tabFromQuery]) {
                setActiveTab(tabFromQuery);
            }
        }
    }, [router.isReady, router.query.tab]);

    // Get the component to render based on the active tab
    const ActiveComponent = grammarTabs[activeTab]?.component;

    return (
        <div>
            <h1>Grammar Topics</h1>
            <p>Select a category to explore German grammar rules and examples.</p>

            <div className={styles.subTabs}>
                {Object.keys(grammarTabs).map((tabKey) => (
                    <button
                        key={tabKey}
                        className={`${styles.subTabBtn} ${activeTab === tabKey ? styles.activeSubTab : ''}`}
                        onClick={() => setActiveTab(tabKey)}
                    >
                        {grammarTabs[tabKey].label}
                    </button>
                ))}
            </div>

            <div>
                {ActiveComponent && <ActiveComponent />}
            </div>
        </div>
    );
}