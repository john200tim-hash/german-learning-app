// src/components/practice/PassiveSubstitutesQuiz.js

import React, { useState } from 'react';
import styles from '../../styles/Layout.module.css';

const passiveSubstitutesQuestionsData = [
    { sentence: "Die Aufgabe ___ noch ___ . (machen)", answer: "ist zu machen", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { sentence: "Dieses Problem ___ leicht ___ . (lösen)", answer: "lässt sich lösen", hint: "Expresses possibility (sich lassen + Infinitiv)." },
    { sentence: "Das Wasser aus diesem Brunnen ist nicht ___ . (trinken)", answer: "trinkbar", hint: "Expresses feasibility (Adjective on -bar)." },
    { sentence: "Die Regeln ___ ___ . (befolgen)", answer: "sind zu befolgen", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { sentence: "Der Fleck ___ nicht ___ . (entfernen)", answer: "lässt sich nicht entfernen", hint: "Expresses possibility (sich lassen + Infinitiv)." },
    { sentence: "Seine Handschrift ist gut ___ . (lesen)", answer: "leserlich", hint: "Expresses feasibility (Adjective on -lich)." },
    { sentence: "Das Formular ___ ___ . (ausfüllen)", answer: "ist auszufüllen", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { sentence: "Das Fenster ___ nicht ___ . (öffnen)", answer: "lässt sich nicht öffnen", hint: "Expresses possibility (sich lassen + Infinitiv)." },
    { sentence: "Der Fehler war ___ . (vermeiden)", answer: "vermeidlich", hint: "Expresses feasibility (Adjective on -lich)." },
    { sentence: "Die Tür ___ sofort ___ . (schließen)", answer: "ist zu schließen", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { sentence: "Der Code ___ nicht ___ . (kompilieren)", answer: "lässt sich nicht kompilieren", hint: "Expresses possibility (sich lassen + Infinitiv)." },
    { sentence: "Sein Verhalten ist nicht ___ . (akzeptieren)", answer: "akzeptabel", hint: "Expresses feasibility (Adjective on -abel)." },
    { sentence: "Diese Anweisung ___ genau ___ . (beachten)", answer: "ist zu beachten", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { sentence: "Der Stoff ___ gut ___ . (waschen)", answer: "lässt sich gut waschen", hint: "Expresses possibility (sich lassen + Infinitiv)." },
    { sentence: "Die Aufgabe ist ___ . (lösen)", answer: "lösbar", hint: "Expresses feasibility (Adjective on -bar)." },
    { sentence: "Seine Schrift ___ kaum ___ . (lesen)", answer: "ist zu lesen", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { sentence: "Die Situation ___ schwer ___ . (erklären)", answer: "lässt sich schwer erklären", hint: "Expresses possibility (sich lassen + Infinitiv)." },
    { sentence: "Diese Pilze sind ___ . (essen)", answer: "essbar", hint: "Expresses feasibility (Adjective on -bar)." },
    { sentence: "Der Müll ___ ___ . (wegwerfen)", answer: "ist wegzuwerfen", hint: "Expresses necessity (sein + zu + Infinitiv)." },
    { sentence: "Das ___ nicht ___ . (ändern)", answer: "lässt sich nicht ändern", hint: "Expresses possibility (sich lassen + Infinitiv)." },
    { sentence: "Sein Argument ist kaum ___ . (glauben)", answer: "glaublich", hint: "Expresses feasibility (Adjective on -lich)." },
    { sentence: "Die Gefahr ___ nicht ___ . (unterschätzen)", answer: "ist zu unterschätzen", hint: "Expresses necessity (sein + zu + Infinitiv)." },
];

export default function PassiveSubstitutesQuiz() {
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
        const nextIndex = (currentIndex + 1) % passiveSubstitutesQuestionsData.length;
        setCurrentIndex(nextIndex);
        setUserAnswer('');
        setFeedback(null);
    };

    return (
        <div className={styles.contentCard}>
            <h2>Passive Substitutes Quiz</h2>
            <div className={styles.quizContainer}>
                <p className={styles.quizQuestionNumber}>
                    Question {currentIndex + 1} of {passiveSubstitutesQuestionsData.length}
                </p>
                <p className={styles.quizInstruction}>Complete the sentence with the correct passive substitute form, using the verb in parentheses:</p>
                <p className={styles.quizQuestionText}>{currentQuestion.sentence.replace('___', '...')}</p>

                <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className={`${styles.quizInput} ${feedback?.correct ? styles.feedbackCorrect : ''} ${feedback?.correct === false ? styles.feedbackIncorrect : ''}`}
                    placeholder="Type your answer here..."
                    onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                    disabled={feedback !== null}
                />
                <button onClick={feedback === null ? checkAnswer : nextQuestion} className={styles.formButton}>
                    {feedback === null ? 'Check' : 'Next →'}
                </button>
                {feedback && <p className={feedback.correct ? styles.feedbackCorrectText : styles.feedbackIncorrectText}>{feedback.hint}</p>}
            </div>
        </div>
    );
}