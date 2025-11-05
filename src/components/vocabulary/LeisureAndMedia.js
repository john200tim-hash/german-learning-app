// src/components/vocabulary/LeisureAndMedia.js

import React, { useState, useEffect } from 'react';
import VocabCard from '../../components/lessons/VocabCard';

const leisureAndMediaData = [
    { word: "ausgehen", meaning: "to go out", explanation: "To leave one's home to go to a social event.", example: "Am Samstagabend gehen wir oft mit Freunden aus. (On Saturday evenings, we often go out with friends.)" },
    { word: "einkaufen", meaning: "to shop", explanation: "To buy goods from a shop.", example: "Ich muss noch für das Wochenende einkaufen. (I still have to go shopping for the weekend.)" },
    { word: "Ostern", meaning: "Easter", explanation: "A Christian festival celebrating the resurrection of Jesus.", example: "An Ostern suchen die Kinder Ostereier. (At Easter, the children look for Easter eggs.)" },
    { word: "Weihnachten", meaning: "Christmas", explanation: "The annual Christian festival celebrating Christ's birth.", example: "An Weihnachten schmücken wir den Weihnachtsbaum. (At Christmas, we decorate the Christmas tree.)" },
    { word: "die Gitarre", meaning: "guitar", explanation: "A stringed musical instrument.", example: "Er kann sehr gut Gitarre spielen. (He can play the guitar very well.)" },
    { word: "die Zeitung", meaning: "newspaper", explanation: "A printed publication containing news.", example: "Mein Vater liest jeden Morgen die Zeitung. (My father reads the newspaper every morning.)" }
];

export default function LeisureAndMedia({ searchTerm }) {
    const [filteredData, setFilteredData] = useState(leisureAndMediaData);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = leisureAndMediaData.filter(item =>
            (item.word && item.word.toLowerCase().includes(term)) ||
            (item.meaning && item.meaning.toLowerCase().includes(term))
        );
        setFilteredData(filtered);
    }, [searchTerm]);

    return (
        <div>
            {filteredData.map((item, index) => <VocabCard key={index} item={item} />)}
        </div>
    );
}