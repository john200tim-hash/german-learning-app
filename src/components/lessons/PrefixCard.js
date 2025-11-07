// src/components/lessons/PrefixCard.js

import React from 'react';
import styles from '../../styles/Layout.module.css';

export default function PrefixCard({ item }) {
  return (
    <div className={styles.vocabCard}>
      <h4 className={styles.vocabWord}>{item.prefix}</h4>
      <p className={styles.vocabMeaning}>{item.meaning}</p>
      <p className={styles.vocabExplanation}>{item.explanation}</p>
      <div className={styles.exampleSentence}>
        {item.examples.map((ex, idx) => (
          <div key={idx} style={{ marginBottom: '0.5rem' }}>
            <p lang="de">{ex.sentence}</p>
            {ex.sentence_trans && (
              <details className={styles.translationDropdown}>
                <summary>Show Translation</summary>
                <p>{ex.sentence_trans}</p>
              </details>
            )}
            <p className={styles.vocabExample} lang="de"><em>Verb: {ex.german} ({ex.translation})</em></p>
          </div>
        ))}
      </div>
    </div>
  );
}