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
    { word: 'sich bemühen', meaning: 'to make an effort, to strive', explanation: 'To try hard to achieve something.', example: 'Er bemüht sich, Deutsch zu lernen. (He makes an effort to learn German.)' },
    { word: 'durchführen', meaning: 'to carry out, to execute', explanation: 'To perform or complete a task or plan.', example: 'Wir müssen den Plan durchführen. (We must carry out the plan.)' },
    { word: 'veranlassen', meaning: 'to arrange, to cause', explanation: 'To make something happen or to initiate an action.', example: 'Ich werde alles Notwendige veranlassen. (I will arrange everything necessary.)' },
    { word: 'wahrnehmen', meaning: 'to perceive, to notice', explanation: 'To become aware or conscious of something.', example: 'Sie nimmt die Details genau wahr. (She perceives the details precisely.)' },
    { word: 'berücksichtigen', meaning: 'to consider, to take into account', explanation: 'To think about something carefully when making a decision.', example: 'Wir müssen alle Faktoren berücksichtigen. (We must consider all factors.)' },
    { word: 'ermöglichen', meaning: 'to enable, to make possible', explanation: 'To provide with the means or opportunity.', example: 'Die Technologie ermöglicht neue Kommunikationswege. (Technology enables new ways of communication.)' },
    { word: 'sich beziehen auf', meaning: 'to refer to', explanation: 'To be connected with or to mention something.', example: 'Ich beziehe mich auf Ihren Brief vom 10. Mai. (I am referring to your letter of May 10th.)' },
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