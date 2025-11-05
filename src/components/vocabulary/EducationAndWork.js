// src/components/vocabulary/EducationAndWork.js

import React, { useState, useEffect } from 'react';
import VocabCard from '../../components/lessons/VocabCard';

const educationAndWorkData = [
    { word: "die Schule", meaning: "school", explanation: "An institution for educating children.", example: "Die Schule beginnt um acht Uhr. (School starts at eight o'clock.)" },
    { word: "der Lehrer", meaning: "teacher (male)", explanation: "A person who teaches, especially in a school.", example: "Unser Deutschlehrer ist sehr nett. (Our German teacher is very nice.)" },
    { word: "die Geschichte", meaning: "history", explanation: "The study of past events.", example: "Geschichte ist mein Lieblingsfach in der Schule. (History is my favorite subject at school.)" },
    { word: "der Beruf", meaning: "profession, job", explanation: "A paid occupation, especially one that involves prolonged training.", example: "Was ist Ihr Beruf? (What is your profession?)" },
    { word: "arbeiten", meaning: "to work", explanation: "To do a job, typically for money.", example: "Sie arbeitet als Ärztin in einem Krankenhaus. (She works as a doctor in a hospital.)" },
    { word: "das Büro", meaning: "office", explanation: "A room or building used as a place for commercial or professional work.", example: "Er ist heute nicht im Büro. (He is not in the office today.)" }
];

export default function EducationAndWork({ searchTerm }) {
    const [filteredData, setFilteredData] = useState(educationAndWorkData);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = educationAndWorkData.filter(item =>
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