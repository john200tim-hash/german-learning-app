// src/components/grammar/IndefiniteWords.js

import React from 'react';
import VocabCard from '../../components/lessons/VocabCard';
import styles from '../../styles/Layout.module.css';

const indefinitePronounsData = [
    { word: 'jemand', meaning: 'someone, anybody', explanation: 'Refers to an unspecified person.', example: 'Jemand hat an der Tür geklopft. (Someone knocked on the door.)' },
    { word: 'niemand', meaning: 'no one, nobody', explanation: 'The negative counterpart to "jemand", referring to the absence of a person.', example: 'Niemand war zu Hause. (No one was at home.)' },
    { word: 'etwas', meaning: 'something, anything', explanation: 'Refers to an unspecified thing, amount, or action.', example: 'Ich muss dir etwas sagen. (I have to tell you something.)' },
    { word: 'nichts', meaning: 'nothing', explanation: 'The negative counterpart to "etwas", referring to the absence of a thing.', example: 'Ich habe heute nichts gegessen. (I have eaten nothing today.)' },
    { word: 'irgendwann', meaning: 'sometime, eventually', explanation: 'Refers to an unspecified point in time.', example: 'Wir sollten uns irgendwann wieder treffen. (We should meet again sometime.)' },
    { word: 'irgendwo', meaning: 'somewhere, anywhere', explanation: 'Refers to an unspecified location or place.', example: 'Meine Brille muss irgendwo hier sein. (My glasses must be around here somewhere.)' },
    { word: 'irgendwie', meaning: 'somehow, in some way', explanation: 'Refers to an unspecified manner or method.', example: 'Wir müssen das Problem irgendwie lösen. (We have to solve the problem somehow.)' },
    { word: 'irgendein', meaning: 'some/any (singular)', explanation: 'Used with singular nouns to refer to an unspecified item.', example: 'Er hat irgendein Buch aus dem Regal genommen. (He took some/any book from the shelf.)' },
    { word: 'man', meaning: 'one, you (in a general sense)', explanation: 'Refers to people in general. The verb is always conjugated in the 3rd person singular.', example: 'In Deutschland isst man viel Brot. (In Germany, one eats a lot of bread.)' },
    { word: 'alle', meaning: 'all, everyone', explanation: 'Refers to the total quantity of people or things.', example: 'Alle waren mit dem Ergebnis zufrieden. (Everyone was happy with the result.)' },
    { word: 'einige', meaning: 'some, a few', explanation: 'Refers to an indefinite, small number of people or things.', example: 'Einige Studenten haben die Prüfung nicht bestanden. (Some students did not pass the exam.)' },
    { word: 'mehrere', meaning: 'several', explanation: 'Refers to more than two people or things, but not many.', example: 'Es gibt mehrere Lösungen für dieses Problem. (There are several solutions to this problem.)' },
    { word: 'viele', meaning: 'many', explanation: 'Refers to a large number of people or things.', example: 'Viele Leute gehen am Wochenende spazieren. (Many people go for a walk on the weekend.)' },
    { word: 'keiner/keine/keins', meaning: 'no one, none', explanation: 'The negative pronoun, used to indicate zero quantity. It must be declined.', example: 'Keiner hat mir geholfen. (No one helped me.)' },
    { word: 'irgendwelche', meaning: 'some/any (plural)', explanation: 'Used with plural nouns to refer to unspecified items.', example: 'Hast du irgendwelche Fragen? (Do you have any questions?)' }
];

export default function IndefiniteWords({ searchTerm }) {
    const filteredData = indefinitePronounsData.filter(item =>
        item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.contentCard}>
            <h2>Indefinite Words (Indefinitpronomen)</h2>
            {filteredData.length > 0 ? filteredData.map((item, index) => <VocabCard key={index} item={item} />) : <p>No items found matching your search.</p>}
        </div>
    );
}