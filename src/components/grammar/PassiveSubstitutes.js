// src/components/grammar/PassiveSubstitutes.js

import React from 'react';
import VocabCard from '../../components/lessons/VocabCard';
import styles from '../../styles/Layout.module.css';

const passiveSubstitutesData = [
    { word: 'sein + zu + Infinitiv', meaning: 'Necessity or Obligation (must be done)', explanation: 'This construction is used to express that something must be done.', example: 'Die Rechnung ist zu bezahlen. (The bill must be paid.)' },
    { word: 'sich lassen + Infinitiv', meaning: 'Possibility (can be done)', explanation: 'This construction is used to express that something is possible to do.', example: 'Das Problem lässt sich lösen. (The problem can be solved.)' },
    { word: 'Adjektive auf -bar / -lich', meaning: 'Feasibility or Quality (is -able/-ible)', explanation: 'Adjectives ending in -bar or -lich often describe what can be done to the noun.', example: 'Das Wasser ist trinkbar. (The water is drinkable.)' }
];

export default function PassiveSubstitutes({ searchTerm }) {
    const filteredData = passiveSubstitutesData.filter(item =>
        item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.contentCard}>
            <h2>Passive Voice Substitutes (Passiversatzformen)</h2>
            {filteredData.length > 0 ? filteredData.map((item, index) => <VocabCard key={index} item={item} />) : <p>No items found matching your search.</p>}
        </div>
    );
}