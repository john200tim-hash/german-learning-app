// src/components/vocabulary/HealthAndSport.js

import React, { useState, useEffect } from 'react';
import VocabCard from '../../components/lessons/VocabCard';

const healthAndSportData = [
    { word: "das Auge", meaning: "eye", explanation: "The organ of sight.", example: "Sie hat blaue Augen. (She has blue eyes.)" },
    { word: "das Bein", meaning: "leg", explanation: "The limb on which a person or animal walks and stands.", example: "Ich habe mir beim Fußball das Bein gebrochen. (I broke my leg playing football.)" },
    { word: "der Fußball", meaning: "football", explanation: "A team game played with a ball.", example: "Am Wochenende spiele ich mit meinen Freunden Fußball. (On the weekend, I play football with my friends.)" },
    { word: "schwimmen", meaning: "to swim", explanation: "To propel the body through water by using the limbs.", example: "Im Sommer gehen wir oft im See schwimmen. (In summer, we often go swimming in the lake.)" },
    { word: "die Erkältung", meaning: "a cold", explanation: "A common viral infection of the nose and throat.", example: "Wegen meiner Erkältung kann ich heute nicht zur Schule gehen. (Because of my cold, I can't go to school today.)" },
    { word: "die Kopfschmerzen", meaning: "headache", explanation: "A continuous pain in the head.", example: "Nach der langen Autofahrt hatte ich Kopfschmerzen. (I had a headache after the long car ride.)" }
];

export default function HealthAndSport({ searchTerm }) {
    const [filteredData, setFilteredData] = useState(healthAndSportData);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = healthAndSportData.filter(item =>
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