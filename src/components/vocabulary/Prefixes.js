// src/components/vocabulary/Prefixes.js
import React from 'react';
import VocabCard from '../../components/lessons/VocabCard';
import styles from '../../styles/Layout.module.css';

export default function Prefixes({ searchTerm }) {
  const prefixesData = [
    { word: 'anrufen', meaning: 'to call (on the phone)', explanation: 'The prefix "an-" is separable.', example: 'Ich rufe dich später an. (I will call you later.)' },
    { word: 'einkaufen', meaning: 'to shop', explanation: 'The prefix "ein-" is separable.', example: 'Wir kaufen im Supermarkt ein. (We are shopping at the supermarket.)' },
    { word: 'mitkommen', meaning: 'to come with/along', explanation: 'The prefix "mit-" is separable.', example: 'Kommst du mit ins Kino? (Are you coming along to the cinema?)' },
    { word: 'vorstellen', meaning: 'to introduce, to imagine', explanation: 'The prefix "vor-" is separable.', example: 'Ich stelle mich vor. (I introduce myself.)' },
    { word: 'zurückgeben', meaning: 'to give back', explanation: 'The prefix "zurück-" is separable.', example: 'Gib mir bitte mein Buch zurück. (Please give me my book back.)' },
    { word: 'aufstehen', meaning: 'to get up, to stand up', explanation: 'The prefix "auf-" is separable.', example: 'Ich stehe jeden Morgen um sechs Uhr auf. (I get up at six o\'clock every morning.)' },
    { word: 'fernsehen', meaning: 'to watch television', explanation: 'The prefix "fern-" is separable.', example: 'Wir sehen abends oft fern. (We often watch TV in the evening.)' },
    { word: 'aussehen', meaning: 'to look, to appear', explanation: 'The prefix "aus-" is separable.', example: 'Du siehst heute gut aus. (You look good today.)' },
  ];

  const filteredData = prefixesData.filter(item =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.contentCard}>
      <h2>Separable Prefixes (Trennbare Präfixe)</h2>
      {filteredData.length > 0 ? filteredData.map((item, index) => <VocabCard key={index} item={item} />) : <p>No prefixes found matching your search.</p>}
    </div>
  );
}