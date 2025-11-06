// src/components/vocabulary/AbstractNouns.js
import React from 'react';
import VocabCard from '../../components/lessons/VocabCard';
import styles from '../../styles/Layout.module.css';

export default function AbstractNouns({ searchTerm }) {
  const nounsData = [
    { word: 'die Herausforderung', meaning: 'the challenge', explanation: 'A call to take part in a contest or fight, or a difficult task.', example: 'Das Projekt ist eine große Herausforderung. (The project is a big challenge.)' },
    { word: 'die Nachhaltigkeit', meaning: 'the sustainability', explanation: 'The ability to be maintained at a certain rate or level.', example: 'Nachhaltigkeit ist wichtig für unsere Zukunft. (Sustainability is important for our future.)' },
    { word: 'die Erkenntnis', meaning: 'the insight, the realization', explanation: 'The understanding of a specific truth.', example: 'Er gewann eine neue Erkenntnis. (He gained a new insight.)' },
    { word: 'die Verantwortung', meaning: 'the responsibility', explanation: 'The state or fact of being accountable or to blame for something.', example: 'Jeder trägt Verantwortung für seine Taten. (Everyone bears responsibility for their actions.)' },
    { word: 'die Gelegenheit', meaning: 'the opportunity', explanation: 'A set of circumstances that makes it possible to do something.', example: 'Nutze die Gelegenheit! (Seize the opportunity!)' },
    { word: 'die Entwicklung', meaning: 'the development', explanation: 'The process of developing or being developed.', example: 'Die technologische Entwicklung ist rasant. (Technological development is rapid.)' },
  ];

  const filteredData = nounsData.filter(item =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.contentCard}>
      <h2>Abstract Nouns (Abstrakte Nomen) - B1+</h2>
      {filteredData.length > 0 ? filteredData.map((item, index) => <VocabCard key={index} item={item} />) : <p>No abstract nouns found matching your search.</p>}
    </div>
  );
}