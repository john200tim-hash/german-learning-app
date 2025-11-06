// src/components/practice/PassivePractice.js

import React, { useState } from 'react';
import styles from '../../styles/Practice.module.css';

const passiveSubstitutesQuestionsData = [
    // sein + zu + Infinitiv
    { category: "sein + zu", sentence: "Die Aufgabe ___ noch ___ . (machen)", answer: "ist zu machen", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { category: "sein + zu", sentence: "Die Regeln ___ ___ . (befolgen)", answer: "sind zu befolgen", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { category: "sein + zu", sentence: "Das Formular ___ ___ . (ausfüllen)", answer: "ist auszufüllen", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { category: "sein + zu", sentence: "Die Gefahr ___ nicht ___ . (unterschätzen)", answer: "ist zu unterschätzen", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { category: "sein + zu", sentence: "Diese Anweisung ___ genau ___ . (beachten)", answer: "ist zu beachten", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { category: "sein + zu", sentence: "Der Müll ___ ___ . (wegwerfen)", answer: "ist wegzuwerfen", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { category: "sein + zu", sentence: "Die Tür ___ sofort ___ . (schließen)", answer: "ist zu schließen", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { category: "sein + zu", sentence: "Seine Schrift ___ kaum ___ . (lesen)", answer: "ist zu lesen", hint: "Expresses necessity (sein + zu + Infinitiv)." },

    // sich lassen + Infinitiv
    { category: "sich lassen", sentence: "Dieses Problem ___ leicht ___ . (lösen)", answer: "lässt sich lösen", hint: "Expresses possibility (sich lassen + Infinitiv)." },
    { category: "sich lassen", sentence: "Der Fleck ___ nicht ___ . (entfernen)", answer: "lässt sich nicht entfernen", hint: "Expresses possibility (sich lassen + Infinitiv)." },
    { category: "sich lassen", sentence: "Das ___ nicht ___ . (ändern)", answer: "lässt sich nicht ändern", hint: "Expresses possibility (sich lassen + Infinitiv)." },
    { category: "sich lassen", sentence: "Der Stoff ___ gut ___ . (waschen)", answer: "lässt sich gut waschen", hint: "Expresses possibility (sich lassen + Infinitiv)." },
    { category: "sich lassen", sentence: "Das Fenster ___ nicht ___ . (öffnen)", answer: "lässt sich nicht öffnen", hint: "Expresses possibility (sich lassen + Infinitiv)." },
    { category: "sich lassen", sentence: "Die Situation ___ schwer ___ . (erklären)", answer: "lässt sich schwer erklären", hint: "Expresses possibility (sich lassen + Infinitiv)." },
    { category: "sich lassen", sentence: "Das Auto ___ reparieren. (reparieren)", answer: "lässt sich reparieren", hint: "Expresses possibility (sich lassen + Infinitiv)." },
    { category: "sich lassen", sentence: "Der Code ___ sich nicht ___ . (kompilieren)", answer: "lässt sich nicht kompilieren", hint: "Expresses possibility (sich lassen + Infinitiv)." },

    // Adjektive auf -bar / -lich
    { category: "Adjektiv", sentence: "Das Wasser aus diesem Brunnen ist nicht ___ . (trinken)", answer: "trinkbar", hint: "Expresses feasibility (Adjective on -bar)." },
    { category: "Adjektiv", sentence: "Diese Pilze sind ___ . (essen)", answer: "essbar", hint: "Expresses feasibility (Adjective on -bar)." },
    { category: "Adjektiv", sentence: "Seine Handschrift ist gut ___ . (lesen)", answer: "leserlich", hint: "Expresses feasibility (Adjective on -lich)." },
    { category: "Adjektiv", sentence: "Die Aufgabe ist ___ . (lösen)", answer: "lösbar", hint: "Expresses feasibility (Adjective on -bar)." },
    { category: "Adjektiv", sentence: "Sein Verhalten ist nicht ___ . (akzeptieren)", answer: "akzeptabel", hint: "Expresses feasibility (Adjective on -abel)." },
    { category: "Adjektiv", sentence: "Der Fehler war ___ . (vermeiden)", answer: "vermeidlich", hint: "Expresses feasibility (Adjective on -lich)." },
    { category: "Adjektiv", sentence: "Die Software ist auf allen Systemen ___ . (anwenden)", answer: "anwendbar", hint: "Expresses feasibility (Adjective on -bar)." },
    { category: "Adjektiv", sentence: "Sein Argument ist kaum ___ . (glauben)", answer: "glaublich", hint: "Expresses feasibility (Adjective on -lich)." }
];

export default function PassivePractice() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const currentQuestion = passiveSubstitutesQuestionsData[currentIndex];

    const checkAnswer = () => {
        if (userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
            setFeedback({ correct: true, message: `Correct! Well done.`, hint: currentQuestion.hint });
        } else {
            setFeedback({ correct: false, message: `Not quite. The correct answer is: ${currentQuestion.answer}`, hint: currentQuestion.hint });
        }
    };

    const nextQuestion = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < passiveSubstitutesQuestionsData.length) {
            setCurrentIndex(nextIndex);
            setUserAnswer('');
            setFeedback(null);
        }
    };

    const prevQuestion = () => {
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            setCurrentIndex(prevIndex);
            setUserAnswer('');
            setFeedback(null);
        }
    };

    return (
        <div className={styles.contentCard}>
            <h2 className={styles.practiceTitle}>Practice Question</h2>
            <p className={styles.practiceInstruction}>Complete the sentence with the correct passive substitute form, using the verb in parentheses:</p>
            <p className={styles.sentenceDisplay}>{currentQuestion.sentence.replace('___', '...')}</p>

            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className={styles.practiceInput}
                    placeholder="Type your answer here..."
                    aria-label="Your answer"
                    onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                />
                <button onClick={checkAnswer} className={styles.checkButton}>Check</button>
            </div>

            {feedback && (
                <div className={feedback.correct ? styles.feedbackCorrect : styles.feedbackIncorrect}>
                    <strong>{feedback.message}</strong>
                    <br />
                    <small>{feedback.hint}</small>
                </div>
            )}

            <div className={styles.navigation}>
                <button onClick={prevQuestion} disabled={currentIndex === 0}>&larr; Previous</button>
                <span>Question {currentIndex + 1} of {passiveSubstitutesQuestionsData.length}</span>
                <button onClick={nextQuestion} disabled={currentIndex === passiveSubstitutesQuestionsData.length - 1}>Next &rarr;</button>
            </div>
        </div>
    );
}