// src/components/vocabulary/ComplexVerbs.js
import React from 'react';
import VocabCard from '../../components/lessons/VocabCard';
import styles from '../../styles/Layout.module.css';

export default function ComplexVerbs({ searchTerm }) {
  const verbsData = [
    { word: 'sich auseinandersetzen mit', meaning: 'to deal with, to grapple with', explanation: 'To engage critically with a topic or person.', example: 'Er muss sich mit der neuen Software auseinandersetzen. (He has to deal with the new software.)' },
    { word: 'hervorheben', meaning: 'to emphasize, to highlight', explanation: 'To stress the importance of something.', example: 'Sie hob die Bedeutung von Bildung hervor. (She emphasized the importance of education.)' },
    { word: 'nachvollziehen', meaning: 'to comprehend, to understand', explanation: 'To understand something by putting oneself in another\'s position.', example: 'Ich kann seine Entscheidung gut nachvollziehen. (I can well understand his decision.)' },
    { word: 'beabsichtigen', meaning: 'to intend, to plan', explanation: 'To have something as a plan or purpose.', example: 'Wir beabsichtigen, nächste Woche zu reisen. (We intend to travel next week.)' },
    { word: 'vermitteln', meaning: 'to convey, to mediate', explanation: 'To communicate information or to act as a go-between.', example: 'Der Lehrer vermittelt Wissen. (The teacher conveys knowledge.)' },
    { word: 'unterstützen', meaning: 'to support, to assist', explanation: 'To give help or encouragement to someone or something.', example: 'Ich werde dich bei deinem Projekt unterstützen. (I will support you with your project.)' },
  ];

  const filteredData = verbsData.filter(item =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.contentCard}>
      <h2>Complex Verbs (Komplexe Verben) - B1+</h2>
      {filteredData.length > 0 ? filteredData.map((item, index) => <VocabCard key={index} item={item} />) : <p>No complex verbs found matching your search.</p>}
    </div>
  );
}