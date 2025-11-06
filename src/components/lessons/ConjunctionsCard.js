// src/components/lessons/ConjunctionsCard.js

import React from 'react';
import styles from '../../styles/Layout.module.css';

export default function ConjunctionsCard({ item }) {
  const { word, meaning, explanation, example } = item;
  const [exampleGerman, exampleEnglish] = example.includes(' (') ? example.split(' (') : [example, ''];

  return (
    <div className={styles.vocabCard}>
      <h4 className={styles.vocabWord}>{word}</h4>
      <p className={styles.vocabMeaning}>{meaning}</p>
      <p className={styles.vocabExplanation}>{explanation}</p>
      <div className={styles.exampleSentence}>
        <p lang="de">{exampleGerman}</p>
        {exampleEnglish && (
          <details className={styles.translationDropdown}>
            <summary>Show Translation</summary>
            <p>{exampleEnglish.slice(0, -1)}</p>
          </details>
        )}
      </div>
    </div>
  );
}