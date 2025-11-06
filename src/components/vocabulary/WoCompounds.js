// src/components/vocabulary/WoCompounds.js

import React, { useState, useEffect } from 'react';
import DaWoCard from '../../components/lessons/DaWoCard';

const woCompoundsData = [
    {
        form: 'womit',
        meanings: [
            { meaning: "with what", example: "Womit schreibst du?", translation: "What are you writing with?" },
            { meaning: "with which", example: "Das ist das Werkzeug, womit ich es repariert habe.", translation: "That is the tool with which I repaired it." }
        ]
    },
    {
        form: 'worüber',
        meanings: [
            { meaning: "about what", example: "Worüber sprecht ihr?", translation: "What are you talking about?" },
            { meaning: "over what", example: "Die Brücke, worüber wir gefahren sind, war alt.", translation: "The bridge over which we drove was old." }
        ]
    },
    {
        form: 'woran',
        meanings: [
            { meaning: "on what / of what", example: "Woran denkst du?", translation: "What are you thinking of?" },
            { meaning: "on which", example: "Die Wand, woran das Bild hing, ist jetzt leer.", translation: "The wall on which the picture hung is now empty." }
        ]
    },    
    { form: 'wodurch', meanings: [{ meaning: 'through what', example: 'Wodurch wurde der Lärm verursacht?', translation: 'What was the noise caused by?' }] },
    { form: 'wofür', meanings: [{ meaning: 'for what', example: 'Wofür interessierst du dich?', translation: 'What are you interested in?' }] },
    { form: 'worauf', meanings: [{ meaning: 'on what / for what', example: 'Worauf wartest du?', translation: 'What are you waiting for?' }] }
];

export default function WoCompounds({ searchTerm }) {
    const [filteredData, setFilteredData] = useState(woCompoundsData);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = woCompoundsData.filter(item => item.form && item.form.toLowerCase().includes(term));
        setFilteredData(filtered);
    }, [searchTerm]);

    return (
        <div>
            {filteredData.map((item, index) => <DaWoCard key={index} item={item} type="wo-compound" />)}
        </div>
    );
}