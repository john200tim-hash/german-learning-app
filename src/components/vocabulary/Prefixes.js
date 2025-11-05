// src/components/vocabulary/Prefixes.js

import React, { useState, useEffect } from 'react';
import VocabCard from '../lessons/VocabCard';

const prefixData = [
    { word: "ab-", meaning: "off, away", explanation: "Indicates separation or departure.", example: "Der Zug fährt um 8 Uhr ab. (The train departs at 8.)" },
    { word: "an-", meaning: "on, at, to", explanation: "Marks contact or beginning.", example: "Sie macht das Licht an. (She turns on the light.)" },
    { word: "auf-", meaning: "up, open", explanation: "Implies upward motion or opening.", example: "Er steht jeden Morgen früh auf. (He gets up early every morning.)" },
    { word: "aus-", meaning: "out, from", explanation: "Suggests exit or completion.", example: "Ich fülle das Formular aus. (I fill out the form.)" },
    { word: "ein-", meaning: "in, into", explanation: "Marks entry or inclusion.", example: "Bitte steigen Sie ein. (Please get in.)" },
    { word: "mit-", meaning: "with, along", explanation: "Implies cooperation or accompaniment.", example: "Ich komme mit ins Kino. (I'll come with you to the cinema.)" },
    { word: "nach-", meaning: "after, follow", explanation: "Indicates pursuit or sequence.", example: "Er denkt über das Problem nach. (He thinks about the problem.)" },
    { word: "vor-", meaning: "before, forward", explanation: "Marks precedence or presentation.", example: "Er stellt sich der Gruppe vor. (He introduces himself to the group.)" },
    { word: "weg-", meaning: "away", explanation: "Implies removal or disappearance.", example: "Sie wirft den Müll weg. (She throws the trash away.)" },
    { word: "zu-", meaning: "to, closed", explanation: "Suggests direction or closure.", example: "Bitte machen Sie die Tür zu. (Please close the door.)" }
];

export default function Prefixes({ searchTerm }) {
    const [filteredData, setFilteredData] = useState(prefixData);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = prefixData.filter(item =>
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