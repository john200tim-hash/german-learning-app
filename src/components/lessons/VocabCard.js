// src/components/lessons/VocabCard.js

import React from 'react';
import styles from '../../styles/Layout.module.css';

/**
 * A card for displaying a single vocabulary item.
 */
export default function VocabCard({ item }) {
    const word = item.word || item.prefix;

    return (
        <div className={styles.contentCard}>
            <div className={styles.vocabWord} lang="de">{word}</div>
            <details className={styles.translationDropdown}>
                <summary>Show Translation</summary>
                <div className={styles.translationContent}>
                    {item.meaning}
                </div>
            </details>
            <p className={styles.explanation}>{item.explanation}</p>
            <p className={styles.vocabExample} lang="de">{item.example}</p>
        </div>
    );
}