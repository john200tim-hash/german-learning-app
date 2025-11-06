// src/components/vocabulary/Numbers.js
import React from 'react';
import VocabCard from '../../components/lessons/VocabCard';
import styles from '../../styles/Layout.module.css';

export default function Numbers({ searchTerm }) {
  const numbersData = [
    { word: 'eins', meaning: 'one', explanation: 'The number 1.', example: 'Ich habe einen Hund. (I have one dog.)' },
    { word: 'zwei', meaning: 'two', explanation: 'The number 2.', example: 'Sie hat zwei Katzen. (She has two cats.)' },
    { word: 'drei', meaning: 'three', explanation: 'The number 3.', example: 'Wir sind drei Personen. (We are three people.)' },
    { word: 'vier', meaning: 'four', explanation: 'The number 4.', example: 'Das Auto hat vier Räder. (The car has four wheels.)' },
    { word: 'fünf', meaning: 'five', explanation: 'The number 5.', example: 'Gib mir fünf! (Give me five!)' },
    { word: 'sechs', meaning: 'six', explanation: 'The number 6.', example: 'Ein Würfel hat sechs Seiten. (A die has six sides.)' },
    { word: 'sieben', meaning: 'seven', explanation: 'The number 7.', example: 'Eine Woche hat sieben Tage. (A week has seven days.)' },
    { word: 'acht', meaning: 'eight', explanation: 'The number 8.', example: 'Die Spinne hat acht Beine. (The spider has eight legs.)' },
    { word: 'neun', meaning: 'nine', explanation: 'The number 9.', example: 'Es ist neun Uhr. (It is nine o\'clock.)' },
    { word: 'zehn', meaning: 'ten', explanation: 'The number 10.', example: 'Ich habe zehn Finger. (I have ten fingers.)' },
    { word: 'elf', meaning: 'eleven', explanation: 'The number 11.', example: 'Es ist elf Uhr. (It is eleven o\'clock.)' },
    { word: 'zwölf', meaning: 'twelve', explanation: 'The number 12.', example: 'Ein Jahr hat zwölf Monate. (A year has twelve months.)' },
    { word: 'dreizehn', meaning: 'thirteen', explanation: 'The number 13.', example: 'Ich bin dreizehn Jahre alt. (I am thirteen years old.)' },
    { word: 'vierzehn', meaning: 'fourteen', explanation: 'The number 14.', example: 'Sie hat vierzehn Bücher. (She has fourteen books.)' },
    { word: 'fünfzehn', meaning: 'fifteen', explanation: 'The number 15.', example: 'Der Bus kommt in fünfzehn Minuten. (The bus comes in fifteen minutes.)' },
    { word: 'sechzehn', meaning: 'sixteen', explanation: 'The number 16.', example: 'Er ist sechzehn Jahre alt. (He is sixteen years old.)' },
    { word: 'siebzehn', meaning: 'seventeen', explanation: 'The number 17.', example: 'Siebzehn ist meine Glückszahl. (Seventeen is my lucky number.)' },
    { word: 'achtzehn', meaning: 'eighteen', explanation: 'The number 18.', example: 'Ich bin achtzehn Jahre alt. (I am eighteen years old.)' },
    { word: 'neunzehn', meaning: 'nineteen', explanation: 'The number 19.', example: 'Neunzehn Grad Celsius. (Nineteen degrees Celsius.)' },
    { word: 'zwanzig', meaning: 'twenty', explanation: 'The number 20.', example: 'Ich habe zwanzig Euro. (I have twenty Euros.)' },
  ];

  const filteredData = numbersData.filter(item =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.contentCard}>
      <h2>Numbers (Zahlen)</h2>
      {filteredData.length > 0 ? filteredData.map((item, index) => <VocabCard key={index} item={item} />) : <p>No numbers found matching your search.</p>}
    </div>
  );
}