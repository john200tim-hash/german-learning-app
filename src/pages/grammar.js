import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.css';
import Layout from '../components/layouts/Layout';
import SearchBar from '../components/layouts/SearchBar';

import IndefiniteWords from '../components/grammar/IndefiniteWords';
import Pronouns from '../components/grammar/Pronouns';
import PassiveSubstitutes from '../components/grammar/PassiveSubstitutes';
import Conjunctions from '../components/grammar/Conjunctions';
const grammarTabs = {
    'indefinite-words': { label: 'Indefinite Words', component: IndefiniteWords },
    pronouns: { label: 'Pronouns', component: Pronouns },
    'passive-substitutes': { label: 'Passive Substitutes', component: PassiveSubstitutes },
    'conjunctions': { label: 'Conjunctions', component: Conjunctions },
};

export default function GrammarPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(Object.keys(grammarTabs)[0]);
    useEffect(() => { // Check for a tab in the URL query on initial load
 if (router.isReady && router.query.tab) {
 const tabFromQuery = router.query.tab;
 if (grammarTabs[tabFromQuery]) {
 setActiveTab(tabFromQuery);
 }
 }
 }, [router.isReady, router.query.tab]);

    const ActiveComponent = grammarTabs[activeTab]?.component;

    const handleTabClick = (tabKey) => {
        setActiveTab(tabKey);
        router.push({
            pathname: '/grammar',
            query: { tab: tabKey },
        }, undefined, { shallow: true });
    };

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
            <h1>German Grammar</h1>
            <p>Explore various grammar topics with explanations and examples.</p>

            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className={styles.subTabsWrapper}>
                <div className={styles.subTabs}>
                    {Object.keys(grammarTabs).map((tabKey) => (
                        <button key={tabKey} className={`${styles.subTabBtn} ${activeTab === tabKey ? styles.activeSubTab : ''}`} onClick={() => handleTabClick(tabKey)}>
                            {grammarTabs[tabKey].label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                {ActiveComponent && <ActiveComponent searchTerm={searchTerm} />}
            </div>
        </>
    );
}
