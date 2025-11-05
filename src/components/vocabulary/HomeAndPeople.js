// src/components/vocabulary/HomeAndPeople.js

import React, { useState, useEffect } from 'react';
import VocabCard from '../../components/lessons/VocabCard';

const homeAndPeopleData = [
    { word: "aufstehen", meaning: "to get up", explanation: "To rise from bed after sleeping.", example: "Ich muss jeden Morgen um 6 Uhr aufstehen. (I have to get up at 6 a.m. every morning.)" },
    { word: "sich waschen", meaning: "to wash oneself", explanation: "The act of cleaning your body.", example: "Er wäscht sich die Hände vor dem Essen. (He washes his hands before eating.)" },
    { word: "freundlich", meaning: "friendly", explanation: "A kind and pleasant personality.", example: "Meine Nachbarin ist sehr freundlich. (My neighbor is very friendly.)" },
    { word: "lustig", meaning: "funny", explanation: "Causing laughter or amusement.", example: "Er erzählt immer lustige Witze. (He always tells funny jokes.)" },
    { word: "die Kleidung", meaning: "clothes, clothing", explanation: "Items worn to cover the body.", example: "Für die Party brauche ich neue Kleidung. (I need new clothes for the party.)" },
    { word: "das Schlafzimmer", meaning: "bedroom", explanation: "A room for sleeping in.", example: "Sein Schlafzimmer ist sehr ordentlich. (His bedroom is very tidy.)" },
    { word: "der Bruder", meaning: "brother", explanation: "A male sibling.", example: "Mein Bruder ist zwei Jahre älter als ich. (My brother is two years older than me.)" },
    { word: "die Schwester", meaning: "sister", explanation: "A female sibling.", example: "Meine Schwester spielt gern Klavier. (My sister likes to play the piano.)" },
    { word: "der Hund", meaning: "dog", explanation: "A common domestic pet.", example: "Der Hund bellt, wenn der Postbote kommt. (The dog barks when the postman comes.)" }
];

export default function HomeAndPeople({ searchTerm }) {
    const [filteredData, setFilteredData] = useState(homeAndPeopleData);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = homeAndPeopleData.filter(item =>
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