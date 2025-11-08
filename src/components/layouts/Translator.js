// src/components/translate/Translator.js
import React, { useState, useEffect } from 'react';
import { Mic, Volume2, ArrowRightLeft, Loader2 } from 'lucide-react';
import styles from '../../styles/Translator.module.css';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'German' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
];

export default function Translator() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('de');
    const [isTranslating, setIsTranslating] = useState(false);
    const [isListening, setIsListening] = useState(false);

    const recognition = (typeof window !== 'undefined' && (new (window.SpeechRecognition || window.webkitSpeechRecognition)())) || null;

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
            return;
        }
        setIsTranslating(true);
        setOutputText('Translating...');

        // --- This is a placeholder for a real translation API ---
        // You would replace this with a call to Google Translate, DeepL, etc.
        // For demonstration, we'll use a free, public API that may have limitations.
        try {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=${from}|${to}`);
            const data = await response.json();

            if (data.responseData) {
                setOutputText(data.responseData.translatedText);
            } else {
                setOutputText('Translation failed.');
            }
        } catch (error) {
            console.error("Translation API error:", error);
            setOutputText('Error: Could not connect to translation service.');
        }
        // --- End of placeholder API call ---

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
                        <button onClick={() => handleSpeak(outputText, targetLang)} className={`${styles.iconButton} ${styles.speakButton}`} aria-label="Speak translation">
                            <Volume2 size={20} />
                        </button>
                    )}
                </div>
            </div>

            <button onClick={() => handleTranslate()} className={styles.translateButton} disabled={isTranslating}>
                {isTranslating ? <Loader2 className={styles.loader} size={24} /> : 'Translate'}
            </button>
        </div>
    );
}

```

### 2. Create the Stylesheet for the Translator

This new component requires its own styles for the layout, buttons, and animations.

**File: `c:\Users\CLAIRVOIYANT\Desktop\german-learning-app\src\styles\Translator.module.css`**

```diff