// src/components/lessons/ConjunctionsCard.js

import React from 'react';
import styles from '../../styles/Layout.module.css';

export default function ConjunctionsCard({ item }) {
  return (
    <div className={styles.vocabCard}>
      <h4 className={styles.vocabWord}>{item.word}</h4>
      <p className={styles.vocabMeaning}>{item.meaning}</p>
      <p className={styles.vocabExplanation}>{item.explanation}</p>
      <div className={styles.exampleSentence}>
        <em lang="de">{item.example}</em>
      </div>
    </div>
  );
}