// src/components/vocabulary/PlacesAndTravel.js

import React, { useState, useEffect } from 'react';
import VocabCard from '../../components/lessons/VocabCard';

const placesAndTravelData = [
    { word: "die Apotheke", meaning: "pharmacy, chemist's", explanation: "A shop where medicines are sold.", example: "Ich muss zur Apotheke gehen, um die Medikamente zu holen. (I have to go to the pharmacy to get the medicine.)" },
    { word: "der Bahnhof", meaning: "train station", explanation: "A place where trains stop for passengers.", example: "Der Zug nach Berlin fährt vom Hauptbahnhof ab. (The train to Berlin departs from the main station.)" },
    { word: "der Berg", meaning: "mountain", explanation: "A large natural elevation of the earth's surface.", example: "Im Winter fahren wir in die Berge zum Skifahren. (In winter, we go to the mountains to ski.)" },
    { word: "der Fluss", meaning: "river", explanation: "A large natural stream of water.", example: "Der Rhein ist ein wichtiger Fluss in Deutschland. (The Rhine is an important river in Germany.)" },
    { word: "das Auto", meaning: "car", explanation: "A road vehicle, typically with four wheels.", example: "Wir fahren mit dem Auto in den Urlaub. (We are going on holiday by car.)" },
    { word: "das Fahrrad", meaning: "bicycle", explanation: "A vehicle with two wheels, propelled by pedals.", example: "Bei gutem Wetter fahre ich mit dem Fahrrad zur Arbeit. (When the weather is good, I ride my bike to work.)" },
    { word: "der Zug", meaning: "train", explanation: "A series of connected railway carriages.", example: "Der Zug hat leider zehn Minuten Verspätung. (Unfortunately, the train is ten minutes late.)" }
];

export default function PlacesAndTravel({ searchTerm }) {
    const [filteredData, setFilteredData] = useState(placesAndTravelData);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = placesAndTravelData.filter(item =>
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