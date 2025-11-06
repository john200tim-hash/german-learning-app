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
    { word: 'ein Auge zudrücken', meaning: 'to turn a blind eye', explanation: 'To deliberately ignore something that one should not.', example: 'Der Lehrer hat ein Auge zugedrückt. (The teacher turned a blind eye.)' },
    { word: 'Butter bei die Fische geben', meaning: 'to get to the point, to spill the beans', explanation: 'To stop beating around the bush and say what needs to be said.', example: 'Jetzt gib mal Butter bei die Fische! (Now get to the point!)' },
    { word: 'jemandem einen Bären aufbinden', meaning: 'to pull someone\'s leg, to tell a tall tale', explanation: 'To tell someone something untrue as a joke or to deceive them.', example: 'Du willst mir doch keinen Bären aufbinden, oder? (You\'re not trying to pull my leg, are you?)' },
    { word: 'auf den Hund kommen', meaning: 'to go to the dogs, to go downhill', explanation: 'To fall into a bad state or condition.', example: 'Seit er seinen Job verloren hat, ist er auf den Hund gekommen. (Since he lost his job, he\'s gone to the dogs.)' },
    { word: 'Tomaten auf den Augen haben', meaning: 'to be oblivious, to not see what everyone else sees', explanation: 'Literally "to have tomatoes on the eyes".', example: 'Siehst du das nicht? Du hast wohl Tomaten auf den Augen! (Don\'t you see that? You must be oblivious!)' },
    { word: 'seinen Senf dazugeben', meaning: 'to give one\'s two cents', explanation: 'To add one\'s own (often unsolicited) opinion.', example: 'Er muss immer seinen Senf dazugeben. (He always has to give his two cents.)' },
    { word: 'Schwein haben', meaning: 'to have a stroke of luck', explanation: 'Literally "to have a pig".', example: 'Ich habe die Prüfung bestanden, da habe ich echt Schwein gehabt! (I passed the exam, I really had a stroke of luck!)' },
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