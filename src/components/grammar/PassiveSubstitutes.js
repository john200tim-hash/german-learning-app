// src/components/grammar/PassiveSubstitutes.js

import React from 'react';
import VocabCard from '../../components/lessons/VocabCard';
import styles from '../../styles/Layout.module.css';

const passiveSubstitutesData = [
    { word: 'sein + zu + Infinitiv', meaning: 'Necessity or Obligation (must be done)', explanation: 'This strong construction is equivalent to using "müssen" or "sollen" with a passive verb. It expresses a clear obligation or necessity.', example: 'Die Rechnung ist zu bezahlen. (The bill must be paid.)' },
    { word: 'sich lassen + Infinitiv', meaning: 'Possibility (can be done)', explanation: 'This construction is equivalent to using "können" with a passive verb. It expresses that an action is possible to perform on the subject.', example: 'Das Problem lässt sich lösen. (The problem can be solved.)' },
    { word: 'Adjektive auf -bar / -lich / -abel', meaning: 'Feasibility or Quality (is -able/-ible)', explanation: 'Adjectives ending in these suffixes often describe what can be done to the noun. "-bar" and "-abel" usually mean "can be done," while "-lich" can also imply possibility.', example: 'Das Wasser ist trinkbar. (The water is drinkable.) Sein Verhalten ist inakzeptabel. (His behavior is unacceptable.)' },
    { word: 'man + Aktiv', meaning: 'General Action (one does something)', explanation: 'Using the indefinite pronoun "man" with an active verb is a very common way to express a passive idea without specifying who is performing the action.', example: 'Man spricht hier Deutsch. (German is spoken here. / One speaks German here.)' }
];

export default function PassiveSubstitutes({ searchTerm }) {
    const filteredData = passiveSubstitutesData.filter(item =>
        item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.contentCard}>
            <div className={styles.videoPreviewContainer}>
                <h3 className={styles.videoPreviewTitle}>Video Lesson: Passive Voice Substitutes</h3>
                <div className={styles.videoWrapper}>
                    <iframe
                        src="https://www.youtube.com/embed/-ZAGeuSb6-U"
                        title="YouTube video player for Passive Voice Substitutes"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            <h2>Passive Voice Substitutes (Passiversatzformen)</h2>
            {filteredData.length > 0 ? filteredData.map((item, index) => <VocabCard key={index} item={item} />) : <p>No items found matching your search.</p>}
        </div>
    );
}