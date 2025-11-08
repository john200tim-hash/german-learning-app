// src/components/translate/AiTool.js

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Send, Mic, Globe, Zap, Loader2, RefreshCw, Search, User, Bot } from 'lucide-react';
import styles from '../../styles/AiTool.module.css';

const CATEGORY_STYLES = {
    Explanation: { title: "Explanation", icon: Zap, textClass: styles.textExplanation },
    Translation: { title: "Translation/Key Term", icon: Globe, textClass: styles.textTranslation },
    Example: { title: "Practical Example", icon: RefreshCw, textClass: styles.textExample },
    "Deep Research": { title: "Deep Dive/Complex Fact", icon: Search, textClass: styles.textDeepResearch }
};

export default function AiTool() {
    const [messages, setMessages] = useState([]);
    const [query, setQuery] = useState('');
    const [language, setLanguage] = useState('English');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const messageListRef = useRef(null);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setError('Speech Recognition is not supported in this browser.');
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'German' ? 'de-DE' : 'en-US';
        recognition.interimResults = false;
        recognition.continuous = false;

        let recognitionTimeout;
        recognition.onstart = () => {
            setIsListening(true);
            setError(null);
            recognitionTimeout = setTimeout(() => recognition.stop(), 10000);
        };
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setQuery(transcript);
            handleGenerate(transcript, language);
        };
        recognition.onerror = (event) => setError(`Voice Error: ${event.error}. Please try again.`);
        recognition.onend = () => {
            clearTimeout(recognitionTimeout);
            setIsListening(false);
        };
        recognition.start();
    };

    const handleGenerate = async (currentQuery = query, currentLang = language) => {
        if (!currentQuery.trim()) return;

        setIsLoading(true);
        setError(null);
        setQuery('');

        setMessages(prev => [...prev, { from: 'user', text: currentQuery }]);

        try {
            const res = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: currentQuery, language: currentLang })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'An unknown error occurred.');
            }

            const result = await res.json();
            const call = result.candidates?.[0]?.content?.parts?.[0]?.functionCall;

            if (call && call.name === 'structured_response' && call.args) {
                setMessages(prev => [...prev, { from: 'bot', structured: call.args }]);
            } else {
                const errorMessage = result.candidates?.[0]?.finishReason || "The model did not return a valid response.";
                setError(`No structured content generated. Reason: . Please try a different query.`);
            }
        } catch (err) {
            console.error("API Call Error:", err);
            setError(`Failed to connect to AI: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div ref={messageListRef} className={styles.messageList}>
                {messages.length === 0 && !isLoading && (
                    <div className={styles.welcomeMessage}>
                        <Bot size={48} />
                        <h2>AI Knowledge Tool</h2>
                        <p>Ask me anything to get a structured response.</p>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`${styles.message} ${msg.from === 'user' ? styles.userMessage : styles.botMessage}`}>
                        <div className={styles.avatar}>
                            {msg.from === 'user' ? <User size={20} /> : <Bot size={20} />}
                        </div>
                        <div className={styles.messageContent}>
                            {msg.from === 'user' ? (
                                <p>{msg.text}</p>
                            ) : (
                                <div className={styles.structuredResponse}>
                                    <div className={styles.filterTabs}>
                                        <button onClick={() => setSelectedCategory('All')} className={`${styles.filterTab} ${selectedCategory === 'All' ? styles.active : ''}`}>All</button>
                                        {Object.keys(CATEGORY_STYLES).map(key => (
                                            <button key={key} onClick={() => setSelectedCategory(key)} className={`${styles.filterTab} ${selectedCategory === key ? styles.active : ''}`}>{key}</button>
                                        ))}
                                    </div>
                                    {Object.entries(CATEGORY_STYLES).map(([key, { title, icon: Icon, textClass }]) => {
                                        const content = msg.structured[key];
                                        if (!content || (selectedCategory !== 'All' && selectedCategory !== key)) return null;
                                        return (
                                            <div key={key} className={styles.categoryItem}>
                                                <div className={`${styles.categoryHeader} `}>
                                                    <Icon size={16} />
                                                    <h4>{title}</h4>
                                                </div>
                                                <p>{content}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className={`${styles.message} ${styles.botMessage}`}>
                        <div className={styles.avatar}><Bot size={20} /></div>
                        <div className={styles.messageContent}><Loader2 className={styles.loader} /></div>
                    </div>
                )}
                {error && <div className={styles.statusError}>{error}</div>}
            </div>

            <div className={styles.inputArea}>
                <div className={styles.languageSelectorContainer}>
                    <label className={styles.languageLabel}>Language:</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} className={styles.languageSelect} disabled={isLoading}>
                        <option value="English">🇬🇧 English</option>
                        <option value="German">🇩🇪 German</option>
                    </select>
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                        placeholder="Ask me anything..."
                        className={styles.queryInput}
                        disabled={isLoading}
                    />
                    <div className={styles.inputButtons}>
                        <button onClick={startListening} disabled={isLoading || isListening} className={`${styles.micButton} ${isListening ? styles.listening : ''}`} title={isListening ? "Listening..." : "Start Voice Input"}>
                            <Mic size={20} />
                        </button>
                        <button onClick={() => handleGenerate()} disabled={isLoading || !query.trim()} className={styles.generateButton} title="Send Message">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
