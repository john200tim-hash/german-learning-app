// src/components/vocabulary/FoodAndDrinks.js
import React from 'react';
import VocabCard from '../../components/lessons/VocabCard';
import styles from '../../styles/Layout.module.css';

export default function FoodAndDrinks({ searchTerm }) {
  const foodData = [
    { word: 'das Brot', meaning: 'the bread', explanation: 'A staple food prepared from a dough of flour and water.', example: 'Ich esse Brot zum Frühstück. (I eat bread for breakfast.)' },
    { word: 'das Wasser', meaning: 'the water', explanation: 'A colorless, transparent, odorless liquid.', example: 'Bitte ein Glas Wasser. (A glass of water, please.)' },
    { word: 'der Apfel', meaning: 'the apple', explanation: 'A round fruit with firm, white flesh and a green or red skin.', example: 'Ein Apfel am Tag hält den Doktor fern. (An apple a day keeps the doctor away.)' },
    { word: 'die Milch', meaning: 'the milk', explanation: 'An opaque white fluid rich in fat and protein, secreted by female mammals.', example: 'Kinder sollten viel Milch trinken. (Children should drink a lot of milk.)' },
    { word: 'das Fleisch', meaning: 'the meat', explanation: 'The flesh of an animal as food.', example: 'Ich esse nicht viel Fleisch. (I don\'t eat much meat.)' },
    { word: 'der Kaffee', meaning: 'the coffee', explanation: 'A hot drink made from the roasted and ground seeds of a tropical shrub.', example: 'Morgens trinke ich immer einen Kaffee. (In the morning, I always drink a coffee.)' },
  ];

  const filteredData = foodData.filter(item =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.contentCard}>
      <h2>Food & Drinks (Essen & Trinken)</h2>
      {filteredData.length > 0 ? filteredData.map((item, index) => <VocabCard key={index} item={item} />) : <p>No food/drinks found matching your search.</p>}
    </div>
  );
}