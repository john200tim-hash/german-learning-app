// src/components/vocabulary/Idioms.js
import React from 'react';
import VocabCard from '../../components/lessons/VocabCard';
import styles from '../../styles/Layout.module.css';

export default function Idioms({ searchTerm }) {
  const idiomsData = [
    { word: 'den Nagel auf den Kopf treffen', meaning: 'to hit the nail on the head', explanation: 'To say something that is precisely right.', example: 'Mit dieser Bemerkung hast du den Nagel auf den Kopf getroffen. (With that remark, you hit the nail on the head.)' },
    { word: 'zwei Fliegen mit einer Klappe schlagen', meaning: 'to kill two birds with one stone', explanation: 'To achieve two aims with a single action.', example: 'Ich kann auf dem Weg zur Arbeit einkaufen und so zwei Fliegen mit einer Klappe schlagen. (I can shop on the way to work and kill two birds with one stone.)' },
    { word: 'auf Wolke sieben schweben', meaning: 'to be on cloud nine', explanation: 'To be extremely happy.', example: 'Seit der Hochzeit schwebt sie auf Wolke sieben. (Since the wedding, she\'s been on cloud nine.)' },
    { word: 'jemandem die Daumen drücken', meaning: 'to keep one\'s fingers crossed for someone', explanation: 'To wish someone good luck.', example: 'Ich drücke dir die Daumen für deine Prüfung! (I\'ll keep my fingers crossed for your exam!)' },
    { word: 'etwas auf die lange Bank schieben', meaning: 'to put something on the back burner', explanation: 'To postpone something.', example: 'Er schiebt die Steuererklärung immer auf die lange Bank. (He always puts off his tax declaration.)' },
    { word: 'ins kalte Wasser springen', meaning: 'to jump in at the deep end', explanation: 'To start something new without much preparation.', example: 'Nach dem Studium musste ich direkt ins kalte Wasser springen. (After university, I had to jump in at the deep end.)' },
  ];

  const filteredData = idiomsData.filter(item =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.contentCard}>
      <h2>Idioms (Redewendungen) - B1+</h2>
      {filteredData.length > 0 ? filteredData.map((item, index) => <VocabCard key={index} item={item} />) : <p>No idioms found matching your search.</p>}
    </div>
  );
}