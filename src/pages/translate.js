// src/pages/translate.js
import React from 'react';
import Translator from '../components/translate/Translator';

export default function TranslatePage() {
    return (
        <div>
            <h1>Translator</h1>
            <p>Translate words and phrases between languages. Use the microphone for voice input or save your favorite translations.</p>
            <Translator />
        </div>
    );
}