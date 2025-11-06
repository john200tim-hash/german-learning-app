// src/components/grammar/Conjunctions.js

import React from 'react';
import ConjunctionsCard from '../../components/lessons/ConjunctionsCard'; // Use the new, specific card
import styles from '../../styles/Layout.module.css';

const conjunctionsData = [
  {
    category: 'Nebenordnende Konjunktionen (Coordinating)',
    explanation: 'These conjunctions connect two main clauses, and they do not change the word order of the second clause.',
    items: [
      { word: 'und', meaning: 'and', explanation: 'Connects two similar ideas or items.', example: 'Ich mag Kaffee und Kuchen. (I like coffee and cake.)' },
      { word: 'aber', meaning: 'but', explanation: 'Introduces a contrast or exception.', example: 'Er ist müde, aber er kann nicht schlafen. (He is tired, but he cannot sleep.)' },
      { word: 'oder', meaning: 'or', explanation: 'Presents an alternative.', example: 'Möchtest du Tee oder Kaffee? (Would you like tea or coffee?)' },
      { word: 'denn', meaning: 'because', explanation: 'Introduces a reason, does not change word order.', example: 'Ich lerne Deutsch, denn ich will in Berlin arbeiten. (I am learning German because I want to work in Berlin.)' },
      { word: 'sondern', meaning: 'but rather', explanation: 'Used after a negative to introduce a correction.', example: 'Er ist nicht müde, sondern gelangweilt. (He is not tired, but rather bored.)' },
      { word: 'doch', meaning: 'yet, however', explanation: 'Introduces an unexpected contrast.', example: 'Er wollte schlafen, doch der Lärm war zu laut. (He wanted to sleep, yet the noise was too loud.)' },
    ]
  },
  {
    category: 'Unterordnende Konjunktionen (Subordinating)',
    explanation: 'These conjunctions introduce a subordinate clause. They send the conjugated verb to the end of their clause.',
    items: [
      { word: 'weil', meaning: 'because', explanation: 'Introduces a reason.', example: 'Ich lerne Deutsch, weil ich in Berlin arbeiten will. (I am learning German because I want to work in Berlin.)' },
      { word: 'dass', meaning: 'that', explanation: 'Introduces a noun clause.', example: 'Ich weiß, dass du müde bist. (I know that you are tired.)' },
      { word: 'ob', meaning: 'if, whether', explanation: 'Introduces a clause expressing uncertainty.', example: 'Ich weiß nicht, ob er kommt. (I don\'t know if he is coming.)' },
      { word: 'wenn', meaning: 'if, when', explanation: 'Used for conditions or repeated events.', example: 'Wenn es regnet, bleibe ich zu Hause. (If it rains, I stay home.)' },
      { word: 'als', meaning: 'when', explanation: 'Used for a single event in the past.', example: 'Als ich ein Kind war, spielte ich oft draußen. (When I was a child, I often played outside.)' },
      { word: 'obwohl', meaning: 'although', explanation: 'Introduces a contrasting idea.', example: 'Er geht spazieren, obwohl es regnet. (He is going for a walk, although it is raining.)' },
      { word: 'bevor', meaning: 'before', explanation: 'Indicates an action happening before another.', example: 'Bevor du gehst, ruf mich an. (Before you go, call me.)' },
      { word: 'nachdem', meaning: 'after', explanation: 'Indicates an action happening after another.', example: 'Nachdem er gegessen hatte, ging er schlafen. (After he had eaten, he went to sleep.)' },
      { word: 'während', meaning: 'while, during', explanation: 'Indicates two actions happening at the same time.', example: 'Ich höre Musik, während ich arbeite. (I listen to music while I work.)' },
      { word: 'seitdem', meaning: 'since', explanation: 'Indicates an action ongoing since a past event.', example: 'Seitdem er hier wohnt, ist er glücklicher. (Since he has lived here, he is happier.)' },
      { word: 'damit', meaning: 'so that', explanation: 'Indicates the purpose of an action.', example: 'Ich lerne, damit ich die Prüfung bestehe. (I am learning so that I pass the exam.)' },
      { word: 'bis', meaning: 'until', explanation: 'Indicates a time limit for an action.', example: 'Warte hier, bis ich zurückkomme. (Wait here until I come back.)' },
      { word: 'sobald', meaning: 'as soon as', explanation: 'Indicates an action that will happen immediately after another.', example: 'Ich rufe dich an, sobald ich ankomme. (I will call you as soon as I arrive.)' },
      { word: 'solange', meaning: 'as long as', explanation: 'Indicates a condition that persists for a duration.', example: 'Solange du hier bist, bin ich glücklich. (As long as you are here, I am happy.)' },
      { word: 'falls', meaning: 'in case, if', explanation: 'Introduces a potential condition, similar to "wenn" but often implying less likelihood.', example: 'Falls du Zeit hast, können wir uns treffen. (In case you have time, we can meet.)' },
    ]
  },
  {
    category: 'Zweiteilige Konjunktionen (Two-Part)',
    explanation: 'These conjunctions work in pairs to connect words or clauses.',
    items: [
      { word: 'entweder ... oder', meaning: 'either ... or', explanation: 'Presents two alternatives.', example: 'Du kannst entweder den Bus oder den Zug nehmen. (You can take either the bus or the train.)' },
      { word: 'sowohl ... als auch', meaning: 'both ... and', explanation: 'Connects two parallel items.', example: 'Er mag sowohl Kaffee als auch Tee. (He likes both coffee and tea.)' },
      { word: 'weder ... noch', meaning: 'neither ... nor', explanation: 'Negates two alternatives.', example: 'Er trinkt weder Kaffee noch Tee. (He drinks neither coffee nor tea.)' },
      { word: 'zwar ... aber', meaning: 'indeed ... but', explanation: 'Makes a concession followed by a contradiction.', example: 'Der Film ist zwar lang, aber sehr interessant. (The movie is indeed long, but very interesting.)' },
      { word: 'je ... desto', meaning: 'the ... the', explanation: 'Shows a proportional relationship. The "je" clause is subordinate.', example: 'Je mehr du lernst, desto besser wirst du. (The more you learn, the better you will become.)' },
      { word: 'nicht nur ... sondern auch', meaning: 'not only ... but also', explanation: 'Emphasizes that two things are true.', example: 'Sie ist nicht nur intelligent, sondern auch sehr freundlich. (She is not only intelligent, but also very friendly.)' },
      { word: 'einerseits ... andererseits', meaning: 'on the one hand ... on the other hand', explanation: 'Presents two contrasting points or perspectives.', example: 'Einerseits möchte ich reisen, andererseits möchte ich Geld sparen. (On the one hand I want to travel, on the other hand I want to save money.)' },
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
              <ConjunctionsCard key={itemIndex} item={item} />
            ))}
          </div>
        ))
      ) : (
        <p>No conjunctions found matching your search.</p>
      )}
    </div>
  );
}