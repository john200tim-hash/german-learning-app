// src/components/vocabulary/Colors.js
import React from 'react';
import VocabCard from '../../components/lessons/VocabCard';
import styles from '../../styles/Layout.module.css';

export default function Colors({ searchTerm }) {
  const colorsData = [
    { word: 'rot', meaning: 'red', explanation: 'The color of blood or fire.', example: 'Der Apfel ist rot. (The apple is red.)' },
    { word: 'blau', meaning: 'blue', explanation: 'The color of the clear sky.', example: 'Der Himmel ist blau. (The sky is blue.)' },
    { word: 'grün', meaning: 'green', explanation: 'The color of grass.', example: 'Das Gras ist grün. (The grass is green.)' },
    { word: 'gelb', meaning: 'yellow', explanation: 'The color of lemons or the sun.', example: 'Die Zitrone ist gelb. (The lemon is yellow.)' },
    { word: 'schwarz', meaning: 'black', explanation: 'The darkest color, the result of the absence of or complete absorption of light.', example: 'Die Nacht ist schwarz. (The night is black.)' },
    { word: 'weiß', meaning: 'white', explanation: 'The color of milk or fresh snow.', example: 'Der Schnee ist weiß. (The snow is white.)' },
    { word: 'grau', meaning: 'gray', explanation: 'A color intermediate between black and white.', example: 'Der Elefant ist grau. (The elephant is gray.)' },
  ];

  const filteredData = colorsData.filter(item =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.contentCard}>
      <h2>Colors (Farben)</h2>
      {filteredData.length > 0 ? filteredData.map((item, index) => <VocabCard key={index} item={item} />) : <p>No colors found matching your search.</p>}
    </div>
  );
}