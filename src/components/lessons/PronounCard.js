// src/components/lessons/PronounCard.js

import styles from '../../styles/Layout.module.css';

export default function PronounCard({ item }) {
  return (
    <div className={styles.contentCard}>
      <h3 className={styles.vocabWord}>
        {item.pronoun} <span style={{ fontSize: '1.2rem', fontWeight: '500', color: 'var(--subtab-text)' }}>({item.meaning})</span>
      </h3>
      <div className={styles.tableContainer}>
        <table className={styles.pronounTable}>
          <thead>
            <tr>
              <th>Case</th>
              <th>Form</th>
              <th>Example</th>
              <th>Explanation</th>
            </tr>
          </thead>
          <tbody>
            {item.cases.map((c) => (
              <tr key={c.case}>
                <td><strong>{c.case}</strong></td>
                <td colSpan="2">
                  <div className={styles.pronounFormsContainer}>
                    {c.forms.map((f, i) => (
                      <div key={i} className={styles.pronounFormEntry}>
                        <span className={styles.pronounForm}>{f.form}</span>
                        <span className={styles.pronounExample} lang="de">{f.example}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td>{c.explanation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}