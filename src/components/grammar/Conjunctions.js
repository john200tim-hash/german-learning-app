// src/components/grammar/Conjunctions.js

import React from 'react';
import VocabCard from '../../components/lessons/VocabCard';
import styles from '../../styles/Layout.module.css';

const conjunctionsData = [
  {
    category: 'Nebenordnende Konjunktionen (Coordinating)',
    explanation: 'These conjunctions connect two main clauses, and they do not change the word order of the second clause.',
    items: [
      { word: 'und', meaning: 'and', explanation: 'Connects two similar ideas or items.', example: 'Ich mag Kaffee und Kuchen.' },
      { word: 'aber', meaning: 'but', explanation: 'Introduces a contrast or exception.', example: 'Er ist müde, aber er kann nicht schlafen.' },
      { word: 'oder', meaning: 'or', explanation: 'Presents an alternative.', example: 'Möchtest du Tee oder Kaffee?' },
      { word: 'denn', meaning: 'because', explanation: 'Introduces a reason, does not change word order.', example: 'Ich lerne Deutsch, denn ich will in Berlin arbeiten.' },
      { word: 'sondern', meaning: 'but rather', explanation: 'Used after a negative to introduce a correction.', example: 'Er ist nicht müde, sondern gelangweilt.' },
      { word: 'doch', meaning: 'yet, however', explanation: 'Introduces an unexpected contrast.', example: 'Er wollte schlafen, doch der Lärm war zu laut.' },
    ]
  },
  {
    category: 'Unterordnende Konjunktionen (Subordinating)',
    explanation: 'These conjunctions introduce a subordinate clause. They send the conjugated verb to the end of their clause.',
    items: [
      { word: 'weil', meaning: 'because', explanation: 'Introduces a reason.', example: 'Ich lerne Deutsch, weil ich in Berlin arbeiten will.' },
      { word: 'dass', meaning: 'that', explanation: 'Introduces a noun clause.', example: 'Ich weiß, dass du müde bist.' },
      { word: 'ob', meaning: 'if, whether', explanation: 'Introduces a clause expressing uncertainty.', example: 'Ich weiß nicht, ob er kommt.' },
      { word: 'wenn', meaning: 'if, when', explanation: 'Used for conditions or repeated events.', example: 'Wenn es regnet, bleibe ich zu Hause.' },
      { word: 'als', meaning: 'when', explanation: 'Used for a single event in the past.', example: 'Als ich ein Kind war, spielte ich oft draußen.' },
      { word: 'obwohl', meaning: 'although', explanation: 'Introduces a contrasting idea.', example: 'Er geht spazieren, obwohl es regnet.' },
      { word: 'bevor', meaning: 'before', explanation: 'Indicates an action happening before another.', example: 'Bevor du gehst, ruf mich an.' },
      { word: 'nachdem', meaning: 'after', explanation: 'Indicates an action happening after another.', example: 'Nachdem er gegessen hatte, ging er schlafen.' },
      { word: 'während', meaning: 'while, during', explanation: 'Indicates two actions happening at the same time.', example: 'Ich höre Musik, während ich arbeite.' },
      { word: 'seitdem', meaning: 'since', explanation: 'Indicates an action ongoing since a past event.', example: 'Seitdem er hier wohnt, ist er glücklicher.' },
      { word: 'damit', meaning: 'so that', explanation: 'Indicates the purpose of an action.', example: 'Ich lerne, damit ich die Prüfung bestehe.' },
      { word: 'bis', meaning: 'until', explanation: 'Indicates a time limit for an action.', example: 'Warte hier, bis ich zurückkomme.' },
    ]
  },
  {
    category: 'Zweiteilige Konjunktionen (Two-Part)',
    explanation: 'These conjunctions work in pairs to connect words or clauses.',
    items: [
      { word: 'entweder ... oder', meaning: 'either ... or', explanation: 'Presents two alternatives.', example: 'Du kannst entweder den Bus oder den Zug nehmen.' },
      { word: 'sowohl ... als auch', meaning: 'both ... and', explanation: 'Connects two parallel items.', example: 'Er mag sowohl Kaffee als auch Tee.' },
      { word: 'weder ... noch', meaning: 'neither ... nor', explanation: 'Negates two alternatives.', example: 'Er trinkt weder Kaffee noch Tee.' },
      { word: 'zwar ... aber', meaning: 'indeed ... but', explanation: 'Makes a concession followed by a contradiction.', example: 'Der Film ist zwar lang, aber sehr interessant.' },
      { word: 'je ... desto', meaning: 'the ... the', explanation: 'Shows a proportional relationship.', example: 'Je mehr du lernst, desto besser wirst du.' },
    ]
  }
];

export default function Conjunctions({ searchTerm }) {
  const lowercasedFilter = searchTerm.toLowerCase();
  const filteredData = conjunctionsData.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.word.toLowerCase().includes(lowercasedFilter) ||
      item.meaning.toLowerCase().includes(lowercasedFilter)
    )
  })).filter(group => group.items.length > 0);

  return (
    <div className={styles.contentCard}>
      <h2>Conjunctions (Konjunktionen)</h2>
      {filteredData.length > 0 ? (
        filteredData.map((group, groupIndex) => (
          <div key={groupIndex} className={styles.grammarGroup}>
            <h3 className={styles.grammarGroupTitle}>{group.category}</h3>
            <p className={styles.grammarGroupExplanation}>{group.explanation}</p>
            {group.items.map((item, itemIndex) => (
              <VocabCard key={itemIndex} item={item} />
            ))}
          </div>
        ))
      ) : (
        <p>No conjunctions found matching your search.</p>
      )}
    </div>
  );
}