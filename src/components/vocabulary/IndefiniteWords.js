// src/components/grammar/IndefiniteWords.js

import React from 'react';
import styles from '../../styles/Layout.module.css'; // This path is correct from its new location

const indefinitePronounsData = [
    {
        word: "irgendetwas",
        explanation: "Refers to an unspecified thing or object. Often shortened to 'etwas'.",
        meanings: [
            { meaning: "something (in a statement)", example: "Ich muss dir irgendetwas Wichtiges sagen.", translation: "I have to tell you something important." },
            { meaning: "anything (in a question)", example: "Hast du irgendetwas gehört?", translation: "Did you hear anything?" }
        ]
    },
    {
        word: "irgendwann",
        explanation: "Refers to an unspecified point in time (past, present, or future).",
        meanings: [
            { meaning: "sometime / at some point", example: "Wir sollten uns irgendwann wieder treffen.", translation: "We should meet again sometime." },
            { meaning: "eventually", example: "Irgendwann wird er es verstehen.", translation: "Eventually, he will understand it." }
        ]
    },
    {
        word: "irgendjemand",
        explanation: "Refers to an unspecified person. Often shortened to 'jemand'.",
        meanings: [
            { meaning: "someone / somebody", example: "Irgendjemand hat an der Tür geklopft.", translation: "Someone knocked on the door." },
            { meaning: "anyone / anybody", example: "Hat irgendjemand meinen Schlüssel gesehen?", translation: "Has anyone seen my key?" }
        ]
    },
];

export default function IndefiniteWords() {
    return (
        <div>
            {indefinitePronounsData.map((item, index) => (
                <div key={index} className={styles.contentCard}>
                    <div className={styles.vocabWord} lang="de">{item.word}</div>
                    <p>{item.explanation}</p>
                    {item.meanings.map((m, i) => (
                        <div key={i} style={{ marginTop: '1rem' }}>
                            <p><strong>Usage:</strong> {m.meaning}</p>
                            <p className={styles.vocabExample} lang="de">{m.example} <em>({m.translation})</em></p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}