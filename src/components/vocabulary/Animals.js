// src/components/vocabulary/Animals.js
import React from 'react';
import VocabCard from '../../components/lessons/VocabCard';
import styles from '../../styles/Layout.module.css';

export default function Animals({ searchTerm }) {
  const animalsData = [
    { word: 'der Hund', meaning: 'the dog', explanation: 'A common domestic pet.', example: 'Der Hund bellt. (The dog is barking.)' },
    { word: 'die Katze', meaning: 'the cat', explanation: 'A small domesticated carnivorous mammal with soft fur.', example: 'Die Katze schläft auf dem Sofa. (The cat is sleeping on the sofa.)' },
    { word: 'das Pferd', meaning: 'the horse', explanation: 'A large plant-eating domesticated mammal with solid hoofs and a flowing mane and tail.', example: 'Das Mädchen reitet das Pferd. (The girl is riding the horse.)' },
    { word: 'der Vogel', meaning: 'the bird', explanation: 'A warm-blooded egg-laying vertebrate distinguished by the possession of feathers, wings, and a beak.', example: 'Der Vogel singt im Baum. (The bird is singing in the tree.)' },
    { word: 'der Fisch', meaning: 'the fish', explanation: 'A limbless cold-blooded vertebrate animal with gills and fins living wholly in water.', example: 'Der Fisch schwimmt im Wasser. (The fish swims in the water.)' },
    { word: 'die Maus', meaning: 'the mouse', explanation: 'A small rodent that typically has a pointed snout, relatively large ears and eyes, and a long tail.', example: 'Die Maus isst den Käse. (The mouse is eating the cheese.)' },
  ];

  const filteredData = animalsData.filter(item =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.contentCard}>
      <h2>Animals (Tiere)</h2>
      {filteredData.length > 0 ? filteredData.map((item, index) => <VocabCard key={index} item={item} />) : <p>No animals found matching your search.</p>}
    </div>
  );
}