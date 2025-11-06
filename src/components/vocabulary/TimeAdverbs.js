// src/pages/lessons/TimeAdverbs.js

import React, { useState, useEffect } from 'react';
import VocabCard from '../lessons/VocabCard';

const timeAdverbData = [
    { word: "damals", meaning: "Back then", explanation: "Used for a past time already known.", example: "Damals hatte ich keine Ahnung. (Back then, I had no idea.)" },
    { word: "früher", meaning: "Earlier / Formerly", explanation: "Refers to something that happened in the past, before now.", example: "Früher bin ich jeden Tag gelaufen. (I used to run every day.)" },
    { word: "bisher", meaning: "Until now / So far", explanation: "Describes something up to the present moment.", example: "Bisher habe ich alles verstanden. (So far, I've understood everything.)" },
    { word: "mittlerweile", meaning: "By now / In the meantime", explanation: "Shows change or progression over time.", example: "Mittlerweile spricht sie fließend Deutsch. (By now, she speaks fluent German.)" },
    { word: "häufig", meaning: "Often", explanation: "Used for repeated actions.", example: "Er besucht uns häufig. (He visits us often.)" },
    { word: "neulich", meaning: "Recently", explanation: "Refers to something that happened not long ago.", example: "Neulich habe ich ihn im Supermarkt gesehen. (I saw him recently in the supermarket.)" },
    { word: "nachher", meaning: "Afterwards / Later", explanation: "Refers to a time following an event.", example: "Wir essen jetzt und spielen nachher. (We'll eat now and play afterwards.)" },
    { word: "demnächst", meaning: "Soon / Shortly", explanation: "Used for events in the near future.", example: "Wir sehen uns demnächst! (See you soon!)" }
];

export default function TimeAdverbs({ searchTerm }) {
    const [filteredData, setFilteredData] = useState(timeAdverbData);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = timeAdverbData.filter(item =>
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
