// src/components/practice/PassivePractice.js

import React, { useState } from 'react';
import styles from '../styles/Practice.module.css';

const passiveSubstitutesQuestionsData = [
    { sentence: "Die Aufgabe ___ noch ___ . (machen)", answer: "ist zu machen", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { sentence: "Dieses Problem ___ leicht ___ . (lösen)", answer: "lässt sich lösen", hint: "Expresses possibility (sich lassen + Infinitiv)." },
    { sentence: "Das Wasser aus diesem Brunnen ist nicht ___ . (trinken)", answer: "trinkbar", hint: "Expresses feasibility (Adjective on -bar)." },
    { sentence: "Die Regeln ___ ___ . (befolgen)", answer: "sind zu befolgen", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { sentence: "Der Fleck ___ nicht ___ . (entfernen)", answer: "lässt sich nicht entfernen", hint: "Expresses possibility (sich lassen + Infinitiv)." },
    { sentence: "Seine Handschrift ist gut ___ . (lesen)", answer: "leserlich", hint: "Expresses feasibility (Adjective on -lich)." },
    { sentence: "Das Formular ___ ___ . (ausfüllen)", answer: "ist auszufüllen", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { sentence: "Das Fenster ___ nicht ___ . (öffnen)", answer: "lässt sich nicht öffnen", hint: "Expresses possibility (sich lassen + Infinitiv)." },
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