// src/components/translate/Translator.js
import React, { useState, useEffect } from 'react';
import { Mic, Volume2, ArrowRightLeft, Loader2, Star, X } from 'lucide-react';
import styles from '../../styles/Translator.module.css';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'German' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'id', name: 'Indonesian' },
];

export default function Translator() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('de');
    const [isTranslating, setIsTranslating] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [alternatives, setAlternatives] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const recognition = (typeof window !== 'undefined' && (new (window.SpeechRecognition || window.webkitSpeechRecognition)())) || null;

    // Load favorites from localStorage on initial render
    useEffect(() => {
        const storedFavorites = localStorage.getItem('translatorFavorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        if (!recognition) return;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputText(transcript);
            handleTranslate(transcript, sourceLang, targetLang);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };
    }, [recognition, sourceLang, targetLang]);

    const handleTranslate = async (textToTranslate = inputText, from = sourceLang, to = targetLang) => {
        if (!textToTranslate.trim()) {
            setOutputText('');
            setAlternatives([]);
            return;
        }
        setIsTranslating(true);
        setOutputText('Translating...');

        try {
            // --- Smart Translation Logic ---
            // Step 1: Use a knowledge API to "understand" and correct the input text in English.
            // This helps handle typos and ambiguous questions.
            const knowledgeResponse = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(textToTranslate)}&format=json`);
            const knowledgeData = await knowledgeResponse.json();
            
            // Use the corrected query from the knowledge API if available, otherwise use the original text.
            const cleanedText = knowledgeData.Heading || textToTranslate;

            // Step 2: Translate the cleaned text to the target language.
            const translationResponse = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanedText)}&langpair=${from}|${to}`);
            const translationData = await translationResponse.json();

            if (translationData.responseData) {
                setOutputText(translationData.responseData.translatedText);
                // Filter alternatives to ensure they are high-quality and genuinely different.
                const uniqueAlternatives = translationData.matches
                    .filter(match => 
                        match.quality > 70 && // Only accept matches with a quality score over 70%
                        match.translation.toLowerCase() !== translationData.responseData.translatedText.toLowerCase()
                    ).slice(0, 3); // Take the top 3 high-quality alternatives
                setAlternatives(uniqueAlternatives);
            } else {
                setOutputText('No translation found.');
                setAlternatives([]);
            }
        } catch (error) {
            console.error("Translation API error:", error);
            setOutputText('Error: Could not connect to the translation service.');
        }

        setIsTranslating(false);
    };

    const handleMicClick = () => {
        if (!recognition) {
            alert("Speech recognition is not supported in your browser.");
            return;
        }
        if (isListening) {
            recognition.stop();
        } else {
            recognition.lang = sourceLang;
            recognition.start();
        }
    };

    const handleSpeak = (text, lang) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) {
            alert("Text-to-speech is not supported in your browser.");
            return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        window.speechSynthesis.speak(utterance);
    };

    const handleSwapLanguages = () => {
        const tempLang = sourceLang;
        setSourceLang(targetLang);
        setTargetLang(tempLang);
        setInputText(outputText);
        setOutputText(inputText);
        setAlternatives([]);
    };

    const handleSaveFavorite = () => {
        if (!inputText || !outputText) return;
        const newFavorite = { source: inputText, translation: outputText, id: Date.now() };
        // Avoid adding duplicates
        if (!favorites.some(fav => fav.source === inputText && fav.translation === outputText)) {
            const updatedFavorites = [newFavorite, ...favorites];
            setFavorites(updatedFavorites);
            localStorage.setItem('translatorFavorites', JSON.stringify(updatedFavorites));
        }
    };

    const handleRemoveFavorite = (id) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('translatorFavorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div className={styles.translatorContainer}>
            <div className={styles.languageSelectors}>
                <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className={styles.langSelect}>
                    {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                </select>
                <button onClick={handleSwapLanguages} className={styles.swapButton} aria-label="Swap languages">
                    <ArrowRightLeft size={20} />
                </button>
                <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className={styles.langSelect}>
                    {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                </select>
            </div>

            <div className={styles.textAreas}>
                <div className={styles.textAreaWrapper}>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter text..."
                        className={styles.mainTextArea}
                    />
                    <button onClick={handleMicClick} className={`${styles.iconButton} ${styles.micButton} ${isListening ? styles.listening : ''}`} aria-label="Use microphone">
                        <Mic size={20} />
                    </button>
                </div>
                <div className={styles.textAreaWrapper}>
                    <textarea
                        value={outputText}
                        readOnly
                        placeholder="Translation"
                        className={styles.mainTextArea}
                    />
                    {outputText && !isTranslating && (
                        <div className={styles.iconButtonGroup}>
                            <button onClick={handleSaveFavorite} className={`${styles.iconButton}`} aria-label="Save to favorites">
                                <Star size={20} />
                            </button>
                            <button onClick={() => handleSpeak(outputText, targetLang)} className={`${styles.iconButton}`} aria-label="Speak translation">
                                <Volume2 size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <button onClick={() => handleTranslate()} className={styles.translateButton} disabled={isTranslating}>
                {isTranslating ? <Loader2 className={styles.loader} size={24} /> : 'Translate'}
            </button>

            {alternatives.length > 0 && (
                <div className={styles.alternativesContainer}>
                    <h4 className={styles.alternativesTitle}>Alternative translations</h4>
                    <ul className={styles.alternativesList}>
                        {alternatives.map(alt => (
                            <li key={alt.id} className={styles.alternativeItem}>
                                {alt.translation}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {favorites.length > 0 && (
                <div className={styles.favoritesContainer}>
                    <h4 className={styles.favoritesTitle}>Favorites</h4>
                    <ul className={styles.favoritesList}>
                        {favorites.map(fav => (
                            <li key={fav.id} className={styles.favoriteItem}>
                                <div className={styles.favoriteText}>
                                    <span>{fav.source}</span>
                                    <span className={styles.favoriteTranslation}>{fav.translation}</span>
                                </div>
                                <button onClick={() => handleRemoveFavorite(fav.id)} className={styles.removeFavoriteButton}><X size={16} /></button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}