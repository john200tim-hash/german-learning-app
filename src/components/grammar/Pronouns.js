// src/components/grammar/Pronouns.js

import React from 'react';
import PronounCard from '../lessons/PronounCard';

const pronounDeclensionData = [
    { pronoun: "ich", meaning: "I", cases: [
        { case: "Nominative", form: "ich", example: "Ich gehe zur Schule.", explanation: "Subject of the sentence." },
        { case: "Accusative", form: "mich", example: "Er sieht mich.", explanation: "Direct object — being seen." },
        { case: "Dative", form: "mir", example: "Er gibt mir ein Buch.", explanation: "Indirect object — receives the book." },
        { case: "Genitive", form: "meiner", example: "Das ist das Auto meiner.", explanation: "Shows possession (less common)." }
    ]},
    { pronoun: "du", meaning: "you (singular, informal)", cases: [
        { case: "Nominative", form: "du", example: "Du bist nett.", explanation: "Subject of the sentence." },
        { case: "Accusative", form: "dich", example: "Ich sehe dich.", explanation: "Direct object — being seen." },
        { case: "Dative", form: "dir", example: "Ich gebe dir das Buch.", explanation: "Indirect object — receives the book." },
        { case: "Genitive", form: "deiner", example: "Das ist das Ende deiner Reise.", explanation: "Shows possession." }
    ]},
    { pronoun: "er", meaning: "he", cases: [
        { case: "Nominative", form: "er", example: "Er spielt Fußball.", explanation: "Subject of the sentence." },
        { case: "Accusative", form: "ihn", example: "Ich sehe ihn.", explanation: "Direct object — being seen." },
        { case: "Dative", form: "ihm", example: "Ich helfe ihm.", explanation: "Indirect object — receives help." },
        { case: "Genitive", form: "seiner", example: "Das ist das Haus seiner Eltern.", explanation: "Shows possession." }
    ]},
    { pronoun: "sie", meaning: "she", cases: [
        { case: "Nominative", form: "sie", example: "Sie liest ein Buch.", explanation: "Subject of the sentence." },
        { case: "Accusative", form: "sie", example: "Ich sehe sie.", explanation: "Direct object — being seen." },
        { case: "Dative", form: "ihr", example: "Ich gebe ihr das Buch.", explanation: "Indirect object — receives the book." },
        { case: "Genitive", form: "ihrer", example: "Das ist das Ende ihrer Geschichte.", explanation: "Shows possession." }
    ]},
    { pronoun: "es", meaning: "it", cases: [
        { case: "Nominative", form: "es", example: "Es regnet.", explanation: "Subject of the sentence." },
        { case: "Accusative", form: "es", example: "Ich sehe es.", explanation: "Direct object — being seen." },
        { case: "Dative", form: "ihm", example: "Ich gebe es ihm.", explanation: "Indirect object — 'it' is given to him." },
        { case: "Genitive", form: "seiner", example: "Die Farbe seines Autos ist blau.", explanation: "Shows possession (of it)." }
    ]},
    { pronoun: "wir", meaning: "we", cases: [
        { case: "Nominative", form: "wir", example: "Wir lernen Deutsch.", explanation: "Subject of the sentence." },
        { case: "Accusative", form: "uns", example: "Er sieht uns.", explanation: "Direct object — being seen." },
        { case: "Dative", form: "uns", example: "Er hilft uns.", explanation: "Indirect object — receives help." },
        { case: "Genitive", form: "unser", example: "Das ist das Ende unserer Reise.", explanation: "Shows possession." }
    ]},
    { pronoun: "ihr", meaning: "you (plural, informal)", cases: [
        { case: "Nominative", form: "ihr", example: "Ihr seid müde.", explanation: "Subject of the sentence." },
        { case: "Accusative", form: "euch", example: "Ich sehe euch.", explanation: "Direct object — being seen." },
        { case: "Dative", form: "euch", example: "Ich gebe euch das Buch.", explanation: "Indirect object — receives the book." },
        { case: "Genitive", form: "euer", example: "Das ist das Ende eurer Reise.", explanation: "Shows possession." }
    ]},
    { pronoun: "Sie", meaning: "you (formal)", cases: [
        { case: "Nominative", form: "Sie", example: "Sie sind freundlich.", explanation: "Subject of the sentence." },
        { case: "Accusative", form: "Sie", example: "Ich sehe Sie.", explanation: "Direct object — being seen." },
        { case: "Dative", form: "Ihnen", example: "Ich gebe Ihnen das Buch.", explanation: "Indirect object — receives the book." },
        { case: "Genitive", form: "Ihrer", example: "Das ist das Ende Ihrer Reise.", explanation: "Shows possession." }
    ]},
    { pronoun: "sie", meaning: "they", cases: [
        { case: "Nominative", form: "sie", example: "Sie spielen Fußball.", explanation: "Subject of the sentence." },
        { case: "Accusative", form: "sie", example: "Ich sehe sie.", explanation: "Direct object — being seen." },
        { case: "Dative", form: "ihnen", example: "Ich gebe ihnen das Buch.", explanation: "Indirect object — receives the book." },
        { case: "Genitive", form: "ihrer", example: "Das ist das Ende ihrer Reise.", explanation: "Shows possession." }
    ]}
];

export default function Pronouns() {
    return (
        <div>
            {pronounDeclensionData.map((item, index) => <PronounCard key={index} item={item} />)}
        </div>
    );
}