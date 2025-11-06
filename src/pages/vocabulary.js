import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.css';


// Import the new components
import Prefixes from '../components/vocabulary/Prefixes';
import TimeAdverbs from '../components/vocabulary/TimeAdverbs';
import DaCompounds from '../components/vocabulary/DaCompounds';
import WoCompounds from '../components/vocabulary/WoCompounds';
import HomeAndPeople from '../components/vocabulary/HomeAndPeople';
import PlacesAndTravel from '../components/vocabulary/PlacesAndTravel';
import HealthAndSport from '../components/vocabulary/HealthAndSport';
import LeisureAndMedia from '../components/vocabulary/LeisureAndMedia';

import EducationAndWork from '../components/vocabulary/EducationAndWork';
import Numbers from '../components/vocabulary/Numbers';
import Colors from '../components/vocabulary/Colors';
import FoodAndDrinks from '../components/vocabulary/FoodAndDrinks';
import Animals from '../components/vocabulary/Animals';
import ComplexVerbs from '../components/vocabulary/ComplexVerbs';
import AbstractNouns from '../components/vocabulary/AbstractNouns';

import Idioms from '../components/vocabulary/Idioms';

const vocabularyTabs = {
    prefixes: { label: 'Prefixes', component: Prefixes },
    'time-adverbs': { label: 'Time Adverbs', component: TimeAdverbs },
    'da-compounds': { label: 'Da-Compounds', component: DaCompounds },
    'wo-compounds': { label: 'Wo-Compounds', component: WoCompounds },
    'home-people': { label: 'Home & People', component: HomeAndPeople },
    'places-travel': { label: 'Places & Travel', component: PlacesAndTravel },
    'health-sport': { label: 'Health & Sport', component: HealthAndSport },
    'leisure-media': { label: 'Leisure & Media', component: LeisureAndMedia },
    'education-work': { label: 'Education & Work', component: EducationAndWork },
    numbers: { label: 'Numbers', component: Numbers },
    colors: { label: 'Colors', component: Colors },
    'food-drinks': { label: 'Food & Drinks', component: FoodAndDrinks },
    animals: { label: 'Animals', component: Animals },
    'complex-verbs': { label: 'Complex Verbs (B1+)', component: ComplexVerbs },
    'abstract-nouns': { label: 'Abstract Nouns (B1+)', component: AbstractNouns },
    idioms: { label: 'Idioms (B1+)', component: Idioms },
};

export default function VocabularyPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(Object.keys(vocabularyTabs)[0]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Check for a tab in the URL query on initial load
        if (router.isReady && router.query.tab) {
            const tabFromQuery = router.query.tab;
            if (vocabularyTabs[tabFromQuery]) {
                setActiveTab(tabFromQuery);
            }
        }
    }, [router.isReady, router.query.tab]);

    // Get the component to render based on the active tab
    const ActiveComponent = vocabularyTabs[activeTab]?.component;

    const handleTabClick = (tabKey, event) => {
        setActiveTab(tabKey);
        const contentArea = document.getElementById('vocabulary-content');
        if (contentArea) {
            contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    };

    return (
        <div>
            <h1>Vocabulary</h1>
            <p>Select a category to see the vocabulary list.</p>

            {/* Search Input */}
            <input
                type="search"
                className={styles.searchInput}
                placeholder="Search vocabulary..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
...

            {/* Sub-tab container */}
            <div className={styles.subTabs}>
                {Object.keys(vocabularyTabs).map((tabKey) => (
                    <button
                        key={tabKey}
                        className={`${styles.subTabBtn} ${activeTab === tabKey ? styles.activeSubTab : ''}`}
                        onClick={(e) => handleTabClick(tabKey, e)}
                    >
                        {vocabularyTabs[tabKey].label}
                    </button>
                ))}
            </div>

            {/* Sub-tab content */}
            <div id="vocabulary-content">
                {ActiveComponent && <ActiveComponent searchTerm={searchTerm} />}
            </div>
        </div>
    );
}