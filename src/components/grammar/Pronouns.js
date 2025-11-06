// src/components/grammar/Pronouns.js

import React from 'react';
import PronounCard from '../../components/lessons/PronounCard';
import styles from '../../styles/Layout.module.css';

const pronounsData = [
    {
        pronoun: 'Personalpronomen',
        meaning: 'Personal Pronouns',
        cases: [
            {
                case: 'Nominativ',
                explanation: 'The subject (who is doing the action).',
                forms: [
                    { form: 'ich', example: 'Ich lerne Deutsch.' },
                    { form: 'du', example: 'Du sprichst schnell.' },
                    { form: 'er/sie/es', example: 'Er/Sie/Es kommt aus Berlin.' },
                    { form: 'wir', example: 'Wir gehen ins Kino.' },
                    { form: 'ihr', example: 'Ihr seid sehr nett.' },
                    { form: 'sie/Sie', example: 'Sie lesen ein Buch. / Sie sind der Chef.' },
                ]
            },
            {
                case: 'Akkusativ',
                explanation: 'The direct object (receives the action).',
                forms: [
                    { form: 'mich', example: 'Siehst du mich?' },
                    { form: 'dich', example: 'Ich liebe dich.' },
                    { form: 'ihn/sie/es', example: 'Ich kaufe ihn/sie/es.' },
                    { form: 'uns', example: 'Er besucht uns morgen.' },
                    { form: 'euch', example: 'Wir laden euch ein.' },
                    { form: 'sie/Sie', example: 'Ich sehe sie. / Ich verstehe Sie.' },
                ]
            },
            {
                case: 'Dativ',
                explanation: 'The indirect object (to/for whom an action is done).',
                forms: [
                    { form: 'mir', example: 'Gib mir bitte das Salz.' },
                    { form: 'dir', example: 'Ich helfe dir.' },
                    { form: 'ihm/ihr/ihm', example: 'Das Auto gehört ihm/ihr.' },
                    { form: 'uns', example: 'Sie erzählt uns eine Geschichte.' },
                    { form: 'euch', example: 'Ich zeige euch den Weg.' },
                    { form: 'ihnen/Ihnen', example: 'Wir danken ihnen. / Ich antworte Ihnen.' },
                ]
            },
            {
                case: 'Genitiv',
                explanation: 'Shows possession or relation (rare in modern German).',
                forms: [
                    { form: 'meiner', example: 'Man gedachte meiner. (They commemorated me.)' },
                    { form: 'deiner', example: 'Wir sind deiner Meinung. (We are of your opinion.)' },
                    { form: 'seiner/ihrer', example: 'Das Herz seiner/ihrer Mutter. (The heart of his/her mother.)' },
                    { form: 'unser', example: 'Anstatt unser kam er. (He came instead of us.)' },
                    { form: 'euer', example: 'Wir bedürfen euer. (We need you.)' },
                    { form: 'ihrer/Ihrer', example: 'Trotz ihrer Warnung... (Despite their/your warning...)' },
                ]
            },
        ]
    },
    {
        pronoun: 'Reflexivpronomen',
        meaning: 'Reflexive Pronouns',
        cases: [
            {
                case: 'Akkusativ',
                explanation: 'Used when the subject is also the direct object.',
                forms: [
                    { form: 'mich', example: 'Ich wasche mich.' },
                    { form: 'dich', example: 'Du freust dich.' },
                    { form: 'sich', example: 'Er rasiert sich.' },
                    { form: 'uns', example: 'Wir treffen uns später.' },
                    { form: 'euch', example: 'Ihr müsst euch beeilen.' },
                    { form: 'sich', example: 'Sie setzen sich.' },
                ]
            },
            {
                case: 'Dativ',
                explanation: 'Used when the subject is also the indirect object.',
                forms: [
                    { form: 'mir', example: 'Ich kaufe mir ein Buch.' },
                    { form: 'dir', example: 'Du wünschst dir etwas.' },
                    { form: 'sich', example: 'Sie putzt sich die Zähne.' },
                    { form: 'uns', example: 'Wir machen uns Sorgen.' },
                    { form: 'euch', example: 'Ihr stellt euch das vor.' },
                    { form: 'sich', example: 'Sie helfen sich gegenseitig.' },
                ]
            }
        ]
    },
    {
        pronoun: 'Possessivartikel',
        meaning: 'Possessive Articles',
        cases: [
            {
                case: 'Base Forms',
                explanation: 'Shows ownership. Must be declined based on the gender and case of the noun it precedes.',
                forms: [
                    { form: 'mein', example: 'mein Hund (my dog)' },
                    { form: 'dein', example: 'dein Buch (your book)' },
                    { form: 'sein/ihr', example: 'sein Auto (his car) / ihr Fahrrad (her bike)' },
                    { form: 'unser', example: 'unser Haus (our house)' },
                    { form: 'euer', example: 'euer Tisch (your [pl.] table)' },
                    { form: 'ihr/Ihr', example: 'ihr Kind (their child) / Ihr Büro (your [f.] office)' },
                ]
            }
        ]
    },
    {
        pronoun: 'Relativpronomen',
        meaning: 'Relative Pronouns',
        cases: [
            {
                case: 'Declension',
                explanation: 'Introduces a relative clause. Must match the gender of the noun and the case required by the clause.',
                forms: [
                    { form: 'der/die/das', example: 'Der Mann, der lacht... (The man who is laughing...)' },
                    { form: 'den/die/das', example: 'Der Film, den ich sah... (The movie that I saw...)' },
                    { form: 'dem/der/dem', example: 'Das Kind, dem ich helfe... (The child whom I am helping...)' },
                ]
            }
        ]
    },
    {
        pronoun: 'Interrogativpronomen',
        meaning: 'Interrogative Pronouns',
        cases: [
            {
                case: 'Declension',
                explanation: 'Used to ask questions about people or things.',
                forms: [
                    { form: 'wer? / was?', example: 'Wer kommt? (Who is coming?)' },
                    { form: 'wen? / was?', example: 'Wen siehst du? (Whom do you see?)' },
                    { form: 'wem?', example: 'Wem gehört das? (To whom does this belong?)' },
                ]
            }
        ]
    }
];

export default function Pronouns({ searchTerm }) {
    const filteredData = pronounsData.filter(item =>
        item.pronoun.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cases.some(c => c.forms.some(f => f.form.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    return (
        <div className={styles.contentCard}>
            <h2>Pronoun Declensions (Pronomen)</h2>
            {filteredData.length > 0 ? filteredData.map((item, index) => <PronounCard key={index} item={item} />) : <p>No pronouns found matching your search.</p>}
        </div>
    );
}