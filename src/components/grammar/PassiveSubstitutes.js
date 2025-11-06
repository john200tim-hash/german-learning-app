// src/components/grammar/PassiveSubstitutes.js

import React from 'react';
import styles from '../../styles/Layout.module.css'; // This path is correct

export default function PassiveSubstitutes() {
    return (
        <div>
            <div className={styles.contentCard}>
                <h3 className={styles.vocabWord}>1. sein + zu + Infinitiv</h3>
                <p className="mb-4">Expresses <strong>necessity or obligation</strong> (must be done).</p>
                <p className={styles.vocabExample}>Die Rechnung <strong>ist zu bezahlen</strong>. (The bill must be paid.)</p>
                <p className={styles.vocabExample}>Das Formular <strong>ist auszufüllen</strong>. (The form must be filled out.)</p>
            </div>
            <div className={styles.contentCard}>
                <h3 className={styles.vocabWord}>2. sich lassen + Infinitiv</h3>
                <p className="mb-4">Expresses <strong>possibility</strong> (can be done).</p>
                <p className={styles.vocabExample}>Das Problem <strong>lässt sich lösen</strong>. (The problem can be solved.)</p>
                <p className={styles.vocabExample}>Der Stoff <strong>lässt sich leicht waschen</strong>. (The fabric can be washed easily.)</p>
            </div>
            <div className={styles.contentCard}>
                <h3 className={styles.vocabWord}>3. Adjektive auf -bar / -lich</h3>
                <p className="mb-4">Expresses <strong>feasibility or quality</strong> (is -able/-ible).</p>
                <p className={styles.vocabExample}>Das Wasser ist <strong>trinkbar</strong>. (The water is drinkable.)</p>
                <p className={styles.vocabExample}>Seine Schrift ist kaum <strong>leserlich</strong>. (His handwriting is barely legible.)</p>
            </div>
        </div>
    );
}