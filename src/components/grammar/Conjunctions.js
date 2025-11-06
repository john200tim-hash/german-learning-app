// src/components/grammar/Conjunctions.js

import React from 'react';
import VocabCard from '../../components/lessons/VocabCard';
import styles from '../../styles/Layout.module.css';

export default function Conjunctions({ searchTerm }) {
  const conjunctionsData = [
    { word: 'und', meaning: 'and', explanation: 'Connects two similar ideas or items.', example: 'Ich mag Kaffee und Kuchen. (I like coffee and cake.)' },
    { word: 'aber', meaning: 'but', explanation: 'Introduces a contrast or exception.', example: 'Er ist müde, aber er kann nicht schlafen. (He is tired, but he cannot sleep.)' },
    { word: 'oder', meaning: 'or', explanation: 'Presents an alternative.', example: 'Möchtest du Tee oder Kaffee? (Would you like tea or coffee?)' },
    { word: 'denn', meaning: 'because (coordinating)', explanation: 'Introduces a reason, does not change word order.', example: 'Ich lerne Deutsch, denn ich will in Berlin arbeiten. (I am learning German because I want to work in Berlin.)' },
    { word: 'sondern', meaning: 'but rather, instead', explanation: 'Used after a negative to introduce a correction or alternative.', example: 'Er ist nicht müde, sondern gelangweilt. (He is not tired, but rather bored.)' },
    { word: 'weil', meaning: 'because (subordinating)', explanation: 'Introduces a reason, sends the conjugated verb to the end of the clause.', example: 'Ich lerne Deutsch, weil ich in Berlin arbeiten will. (I am learning German because I want to work in Berlin.)' },
    { word: 'dass', meaning: 'that', explanation: 'Introduces a subordinate clause, sends the verb to the end.', example: 'Ich weiß, dass du müde bist. (I know that you are tired.)' },
    { word: 'ob', meaning: 'if, whether', explanation: 'Introduces a subordinate clause that expresses uncertainty or a question.', example: 'Ich weiß nicht, ob er kommt. (I don\'t know if he is coming.)' },
    { word: 'wenn', meaning: 'if, when', explanation: 'Used for conditions (if) or repeated/future events (when). Sends the verb to the end.', example: 'Wenn es regnet, bleibe ich zu Hause. (If it rains, I stay home.)' },
    { word: 'als', meaning: 'when', explanation: 'Used for a single, specific event in the past. Sends the verb to the end.', example: 'Als ich ein Kind war, spielte ich oft draußen. (When I was a child, I often played outside.)' },
    { word: 'obwohl', meaning: 'although, even though', explanation: 'Introduces a subordinate clause that presents a contrast. Sends the verb to the end.', example: 'Er geht spazieren, obwohl es regnet. (He is going for a walk, although it is raining.)' },
    { word: 'bevor', meaning: 'before', explanation: 'Introduces a subordinate clause that indicates an action happening before another. Sends the verb to the end.', example: 'Bevor du gehst, ruf mich an. (Before you go, call me.)' },
    { word: 'nachdem', meaning: 'after', explanation: 'Introduces a subordinate clause that indicates an action happening after another. Sends the verb to the end.', example: 'Nachdem er gegessen hatte, ging er schlafen. (After he had eaten, he went to sleep.)' }
  ];

  const filteredData = conjunctionsData.filter(item =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.contentCard}>
      <h2>Conjunctions (Konjunktionen)</h2>
      {filteredData.length > 0 ? filteredData.map((item, index) => <VocabCard key={index} item={item} />) : <p>No conjunctions found matching your search.</p>}
    </div>
  );
}