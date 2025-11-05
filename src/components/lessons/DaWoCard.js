// src/components/lessons/DaWoCard.js

import styles from '../../styles/Layout.module.css';

export default function DaWoCard({ item, type }) {
  // Renderer for Da-Compounds
  if (type === 'da-compound') {
    return (
      <div className={styles.contentCard}>
        <div className={styles.vocabWord} lang="de">{item.word}</div>
        <p><strong>Meaning:</strong> {item.meaning}</p>
        
        <div style={{ marginTop: '1rem' }}>
          <h4 style={{ color: 'var(--heading-color)', fontWeight: '600' }}>Abstract Use</h4>
          <p className={styles.vocabExample} lang="de">{item.abstract} <em>({item.abstract_trans})</em></p>
          <p style={{ paddingLeft: '1.25rem', fontSize: '0.9rem' }}>{item.abstractExplain}</p>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <h4 style={{ color: 'var(--heading-color)', fontWeight: '600' }}>Physical Use</h4>
          <p className={styles.vocabExample} lang="de">{item.physical} <em>({item.physical_trans})</em></p>
          <p style={{ paddingLeft: '1.25rem', fontSize: '0.9rem' }}>{item.physicalExplain}</p>
        </div>
      </div>
    );
  }

  // Renderer for Wo-Compounds
  if (type === 'wo-compound') {
    return (
      <div className={styles.contentCard}>
        <div className={styles.vocabWord} lang="de">{item.form}</div>
        {item.meanings.map((m, index) => (
          <div key={index} style={{ marginTop: '1rem' }}>
            <p><strong>Usage {index + 1}:</strong> {m.meaning}</p>
            <p className={styles.vocabExample} lang="de">{m.example} <em>({m.translation})</em></p>
          </div>
        ))}
      </div>
    );
  }

  return null; // Return null if type is not recognized
}