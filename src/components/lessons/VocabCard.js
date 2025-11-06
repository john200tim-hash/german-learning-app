// src/components/lessons/VocabCard.js

import React from 'react';
import styles from '../../styles/Layout.module.css';

/**
 * Renders a single, detailed vocabulary item with its meaning,
 * explanation, example sentence, and a dropdown translation.
 */
export default function VocabCard({ item }) {
  const { word, meaning, explanation, example } = item;
  const [exampleGerman, exampleEnglish] = example.split(' (');

  return (
    <div className={styles.vocabCard}>
      <h3 className={styles.vocabWord}>{word}</h3>
      <p className={styles.vocabMeaning}>{meaning}</p>
      <p className={styles.vocabExplanation}>{explanation}</p>
      
      <div className={styles.exampleSentence}>
        <p>{exampleGerman}</p>
        <details className={styles.translationDropdown}>
          <summary>Show Translation</summary>
          <p>{exampleEnglish.slice(0, -1)}</p>
        </details>
      </div>
    </div>
  );
}