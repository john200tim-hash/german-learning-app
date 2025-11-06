// src/components/practice/IndefiniteWordsQuiz.js

import React, { useState } from 'react';
import styles from '../../styles/Layout.module.css';

const quizQuestions = [
    { question: "Hat ___ meinen Schlüssel gesehen?", answer: "jemand", explanation: "'jemand' (someone) is used for an unspecified person in a question." },
    { question: "Ich habe heute ___ gegessen.", answer: "nichts", explanation: "'nichts' (nothing) is the negative, used to state the absence of a thing." },
    { question: "Wir müssen das Problem ___ lösen.", answer: "irgendwie", explanation: "'irgendwie' (somehow) refers to an unspecified manner or way." },
    { question: "___ war zu Hause.", answer: "Niemand", explanation: "'Niemand' (no one) is the negative, used to state the absence of a person. Note the capitalization at the start of a sentence." },
    { question: "Ich muss dir ___ sagen.", answer: "etwas", explanation: "'etwas' (something) is used for an unspecified thing or object." },
    { question: "Meine Brille muss ___ hier sein.", answer: "irgendwo", explanation: "'irgendwo' (somewhere) refers to an unspecified place." },
    { question: "Hast du ___ Fragen?", answer: "irgendwelche", explanation: "'irgendwelche' (any) is used with plural nouns in questions." },
    { question: "Er hat ___ Buch aus dem Regal genommen.", answer: "irgendein", explanation: "'irgendein' (any/a) is used with singular neuter/masculine nouns." },
    { question: "___ werden wir uns wiedersehen.", answer: "Irgendwann", explanation: "'Irgendwann' (sometime/eventually) refers to an unspecified time. Note the capitalization." },
    { question: "Kann mir ___ helfen?", answer: "irgendjemand", explanation: "'irgendjemand' is a more emphasized version of 'jemand' (anyone at all)." },
    { question: "Ich habe ___ zu tun.", answer: "nichts", explanation: "'nichts' (nothing) correctly states there is an absence of things to do." },
    { question: "Er ist ___ in der Stadt.", answer: "irgendwo", explanation: "'irgendwo' (somewhere) indicates an unspecified location within the city." },
    { question: "Möchtest du ___ trinken?", answer: "etwas", explanation: "'etwas' (something) is used to offer an unspecified thing." },
    { question: "___ hat das erwartet.", answer: "Niemand", explanation: "'Niemand' (Nobody) is used to express that zero people expected it." },
    { question: "___ hat mein Fahrrad gestohlen.", answer: "Jemand", explanation: "'Jemand' (Someone) refers to an unknown person who committed the action." },
    { question: "Gibt es ___ Probleme?", answer: "irgendwelche", explanation: "'irgendwelche' (any) is used with plural nouns ('Probleme') in a question." },
    { question: "Das muss ___ funktionieren.", answer: "irgendwie", explanation: "'irgendwie' (somehow) indicates the manner of functioning is not specified." },
    { question: "Nimm ___ T-Shirt.", answer: "irgendein", explanation: "'irgendein' (any) is used for a singular neuter noun ('das T-Shirt')." },
    { question: "Ich habe ___ Seltsames gesehen.", answer: "etwas", explanation: "'etwas' is used here before an adjective to mean 'something strange'." },
    { question: "___ kennt die Antwort.", answer: "Niemand", explanation: "'Niemand' (No one) is the subject, indicating that zero people know the answer." },
    { question: "Wir können uns ___ treffen.", answer: "irgendwann", explanation: "'irgendwann' (sometime) refers to an unspecified future time for meeting." },
    { question: "Ich habe ___ Geld dabei.", answer: "kein", explanation: "'kein' is the negative article used before nouns, here meaning 'no money'." }
];

export default function IndefiniteWordsQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState(''); // 'correct', 'incorrect', ''
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const currentQuestion = quizQuestions[currentQuestionIndex];

    const checkAnswer = () => {
        if (userInput.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
            setFeedback('correct');
            setScore(score + 1);
        } else {
            setFeedback('incorrect');
        }

        setTimeout(() => {
            setFeedback('');
            if (currentQuestionIndex < quizQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setUserInput('');
            } else {
                setIsFinished(true);
            }
        }, 1500);
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserInput('');
        setFeedback('');
        setScore(0);
        setIsFinished(false);
    };

    if (isFinished) {
        return (
            <div className={styles.contentCard}>
                <h2>Quiz Complete!</h2>
                <p className={styles.quizScore}>Your final score: {score} out of {quizQuestions.length}</p>
                <button onClick={restartQuiz} className={styles.formButton}>Restart Quiz</button>
            </div>
        );
    }

    return (
        <div className={styles.contentCard}>
            <h2>Indefinite Words Quiz</h2>
            <div className={styles.quizContainer}>
                <p className={styles.quizQuestionNumber}>
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </p>
                <p className={styles.quizQuestionText}>{currentQuestion.question.replace('___', '______')}</p>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className={`${styles.quizInput} ${feedback === 'correct' ? styles.feedbackCorrect : ''} ${feedback === 'incorrect' ? styles.feedbackIncorrect : ''}`}
                    placeholder="Type the missing word"
                    onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                    disabled={feedback !== ''}
                />
                <button onClick={checkAnswer} className={styles.formButton} disabled={feedback !== ''}>
                    Check
                </button>
                {feedback && (
                    <p className={feedback === 'correct' ? styles.feedbackCorrectText : styles.feedbackIncorrectText}>{currentQuestion.explanation}</p>
                )}
            </div>
        </div>
    );
}