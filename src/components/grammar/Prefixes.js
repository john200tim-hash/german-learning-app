// src/components/grammar/Prefixes.js

import React, { useState } from 'react';
import styles from '../../styles/Layout.module.css';
import PrefixCard from '../lessons/PrefixCard'; // New component for notes

const prefixNotesData = [
    {
        prefix: 'ab-',
        meaning: 'off, down, away from',
        explanation: 'Often implies separation, completion, or reduction.',
        examples: [
            { german: 'abfahren', translation: 'to depart', sentence: 'Der Zug fährt um 10 Uhr ab.', sentence_trans: 'The train departs at 10 AM.' },
            { german: 'abnehmen', translation: 'to lose weight, to take off', sentence: 'Ich möchte abnehmen.', sentence_trans: 'I want to lose weight.' }
        ]
    },
    {
        prefix: 'an-',
        meaning: 'on, at, to, beginning',
        explanation: 'Often implies attachment, beginning, or direction towards.',
        examples: [
            { german: 'ankommen', translation: 'to arrive', sentence: 'Wann kommt der Bus an?', sentence_trans: 'When does the bus arrive?' },
            { german: 'anrufen', translation: 'to call (on the phone)', sentence: 'Ich rufe dich später an.', sentence_trans: 'I will call you later.' }
        ]
    },
    {
        prefix: 'auf-',
        meaning: 'up, open, on',
        explanation: 'Often implies opening, upward movement, or starting.',
        examples: [
            { german: 'aufstehen', translation: 'to get up', sentence: 'Ich stehe um 7 Uhr auf.', sentence_trans: 'I get up at 7 AM.' },
            { german: 'aufmachen', translation: 'to open', sentence: 'Kannst du das Fenster aufmachen?', sentence_trans: 'Can you open the window?' }
        ]
    },
    {
        prefix: 'aus-',
        meaning: 'out of, from',
        explanation: 'Often implies movement out of something, completion, or ending.',
        examples: [
            { german: 'ausgehen', translation: 'to go out', sentence: 'Wir gehen heute Abend aus.', sentence_trans: 'We are going out tonight.' },
            { german: 'ausfüllen', translation: 'to fill out', sentence: 'Bitte füllen Sie das Formular aus.', sentence_trans: 'Please fill out the form.' }
        ]
    },
    {
        prefix: 'be-',
        meaning: 'around, with, completely (inseparable)',
        explanation: 'Makes transitive verbs, often intensifies meaning. Always inseparable.',
        examples: [
            { german: 'besuchen', translation: 'to visit', sentence: 'Ich besuche meine Oma.', sentence_trans: 'I am visiting my grandma.' },
            { german: 'bekommen', translation: 'to get, to receive', sentence: 'Ich bekomme einen Brief.', sentence_trans: 'I am receiving a letter.' }
        ]
    },
    {
        prefix: 'ent-',
        meaning: 'away from, undoing, beginning (inseparable)',
        explanation: 'Often implies separation, removal, or development. Always inseparable.',
        examples: [
            { german: 'entdecken', translation: 'to discover', sentence: 'Kolumbus entdeckte Amerika.', sentence_trans: 'Columbus discovered America.' },
            { german: 'entscheiden', translation: 'to decide', sentence: 'Ich muss mich entscheiden.', sentence_trans: 'I have to decide.' }
        ]
    },
    {
        prefix: 'ver-',
        meaning: 'away, wrong, completion, change (inseparable)',
        explanation: 'Often implies error, completion, or transformation. Always inseparable.',
        examples: [
            { german: 'vergessen', translation: 'to forget', sentence: 'Ich habe meinen Schlüssel vergessen.', sentence_trans: 'I forgot my key.' },
            { german: 'verstehen', translation: 'to understand', sentence: 'Verstehst du das?', sentence_trans: 'Do you understand that?' }
        ]
    },
    {
        prefix: 'zer-',
        meaning: 'apart, to pieces (inseparable)',
        explanation: 'Always implies destruction or breaking into pieces. Always inseparable.',
        examples: [
            { german: 'zerbrechen', translation: 'to break (into pieces)', sentence: 'Das Glas ist zerbrochen.', sentence_trans: 'The glass broke.' },
            { german: 'zerstören', translation: 'to destroy', sentence: 'Der Sturm hat das Haus zerstört.', sentence_trans: 'The storm destroyed the house.' }
        ]
    },
    {
  prefix: 'mit-',
  meaning: 'with, along, together',
  explanation: 'Implies accompaniment, cooperation, or simultaneous action.',
  examples: [
    {
      german: 'mitkommen',
      translation: 'to come along',
      sentence: 'Kommst du mit ins Kino?',
      sentence_trans: 'Are you coming along to the cinema?'
    },
    {
      german: 'mitmachen',
      translation: 'to participate',
      sentence: 'Willst du beim Spiel mitmachen?',
      sentence_trans: 'Do you want to participate in the game?'
    }
  ]
},
{
  prefix: 'nach-',
  meaning: 'after, following, toward',
  explanation: 'Often indicates pursuit, repetition, or direction.',
  examples: [
    {
      german: 'nachdenken',
      translation: 'to reflect, think about',
      sentence: 'Ich muss darüber nachdenken.',
      sentence_trans: 'I need to think about it.'
    },
    {
      german: 'nachfragen',
      translation: 'to inquire',
      sentence: 'Kann ich kurz nachfragen?',
      sentence_trans: 'Can I quickly ask a follow-up question?'
    }
  ]
},
{
  prefix: 'um-',
  meaning: 'around, over, re-',
  explanation: 'Can imply change, reversal, or surrounding movement.',
  examples: [
    {
      german: 'umsteigen',
      translation: 'to transfer (transport)',
      sentence: 'Wir müssen in Berlin umsteigen.',
      sentence_trans: 'We have to transfer in Berlin.'
    },
    {
      german: 'umarmen',
      translation: 'to hug',
      sentence: 'Sie umarmt ihre Freundin.',
      sentence_trans: 'She hugs her friend.'
    }
  ]
},
{
  prefix: 'ein-',
  meaning: 'in, into, inward',
  explanation: 'Often implies entering, inclusion, or beginning.',
  examples: [
    {
      german: 'einsteigen',
      translation: 'to get in (vehicle)',
      sentence: 'Er steigt in den Bus ein.',
      sentence_trans: 'He gets on the bus.'
    },
    {
      german: 'einladen',
      translation: 'to invite',
      sentence: 'Ich lade dich zur Party ein.',
      sentence_trans: 'I’m inviting you to the party.'
    }
  ]
},
{
  prefix: 'los-',
  meaning: 'off, away, start',
  explanation: 'Often signals the beginning of an action or detachment.',
  examples: [
    {
      german: 'losgehen',
      translation: 'to get going, to start',
      sentence: 'Wann geht es los?',
      sentence_trans: 'When does it start?'
    },
    {
      german: 'loslassen',
      translation: 'to let go',
      sentence: 'Lass mich los!',
      sentence_trans: 'Let me go!'
    }
  ]
}, 
{
  prefix: 'hin-',
  meaning: 'toward, away (from speaker)',
  explanation: 'Indicates movement away from the speaker’s position.',
  examples: [
    {
      german: 'hinlegen',
      translation: 'to lay down',
      sentence: 'Ich lege das Buch hin.',
      sentence_trans: 'I’m laying the book down.'
    },
    {
      german: 'hinschreiben',
      translation: 'to write down',
      sentence: 'Schreib deinen Namen hin.',
      sentence_trans: 'Write your name down.'
    }
  ]
},
{
  prefix: 'her-',
  meaning: 'toward the speaker',
  explanation: 'Indicates movement toward the speaker’s position.',
  examples: [
    {
      german: 'herkommen',
      translation: 'to come here',
      sentence: 'Komm bitte her!',
      sentence_trans: 'Come here, please!'
    },
    {
      german: 'herausnehmen',
      translation: 'to take out',
      sentence: 'Nimm das Buch heraus.',
      sentence_trans: 'Take the book out.'
    }
  ]
}
];

export default function Prefixes({ searchTerm }) {
    const [activeSubTab, setActiveSubTab] = useState('videos'); // 'videos' or 'notes'

    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredNotes = prefixNotesData.filter(item =>
        item.prefix.toLowerCase().includes(lowercasedFilter) ||
        item.meaning.toLowerCase().includes(lowercasedFilter) ||
        item.explanation.toLowerCase().includes(lowercasedFilter) ||
        item.examples.some(ex => ex.german.toLowerCase().includes(lowercasedFilter) || ex.translation.toLowerCase().includes(lowercasedFilter))
    );

    return (
        <div className={styles.contentCard}>
            <h2>German Verb Prefixes (Präfixe)</h2>

            <div className={styles.subTabs}>
                <button className={`${styles.subTabBtn} ${activeSubTab === 'videos' ? styles.activeSubTab : ''}`} onClick={() => setActiveSubTab('videos')}>Videos</button>
                <button className={`${styles.subTabBtn} ${activeSubTab === 'notes' ? styles.activeSubTab : ''}`} onClick={() => setActiveSubTab('notes')}>Notes</button>
            </div>

            {activeSubTab === 'videos' && (
                <>
                    <p>Explore the meanings and usage of various German verb prefixes through these video lessons.</p>

                    <div className={styles.videoPreviewContainer}>
                        <h3 className={styles.videoPreviewTitle}>Video Lesson: Separable Prefixes (Trennbare Verben)</h3>
                        <div className={styles.videoWrapper}>
                            <iframe src="https://www.youtube.com/embed/NdGtvuPo6Kg" title="German Separable Prefixes (Trennbare Verben)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>

                    <div className={styles.videoPreviewContainer}>
                        <h3 className={styles.videoPreviewTitle}>Video Lesson: Inseparable Prefixes (Untrennbare Verben)</h3>
                        <div className={styles.videoWrapper}>
                            <iframe
                                src="https://www.youtube.com/embed/2A6R6G00A68"
                                title="German Inseparable Prefixes (Untrennbare Verben)"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <div className={styles.videoPreviewContainer}>
                        <h3 className={styles.videoPreviewTitle}>Video Lesson: Common Inseparable Prefixes (be-, emp-, ent-, er-, ge-, ver-, zer-)</h3>
                        <div className={styles.videoWrapper}>
                            <iframe
                                src="https://www.youtube.com/embed/odXZAOmdXOU"
                                title="Common German Inseparable Prefixes"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <div className={styles.videoPreviewContainer}>
                        <h3 className={styles.videoPreviewTitle}>Video Lesson: Mixed Prefixes (durch-, um-, unter-, über-, wider-)</h3>
                        <div className={styles.videoWrapper}>
                            <iframe
                                src="https://www.youtube.com/embed/rZONU3SZsxQ"
                                title="German Mixed Prefixes (durch-, um-, unter-, über-, wider-)"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <div className={styles.videoPreviewContainer}>
                        <h3 className={styles.videoPreviewTitle}>Video Lesson: Common Separable Prefixes (ab-, an-, auf-, aus-, bei-, ein-, mit-, nach-, vor-, zu-)</h3>
                        <div className={styles.videoWrapper}>
                            <iframe
                                src="https://www.youtube.com/embed/bzSG9k8pF3Y"
                                title="Common German Separable Prefixes"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <div className={styles.videoPreviewContainer}>
                        <h3 className={styles.videoPreviewTitle}>Video Lesson: Other Separable Prefixes (weg-, her-, hin-, los-, fest-, klein-, groß-, hoch-, tief-, weit-, zusammen-)</h3>
                        <div className={styles.videoWrapper}>
                            <iframe
                                src="https://www.youtube.com/embed/hgvDKn05Ilk"
                                title="Other German Separable Prefixes"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </>
            )}

            {activeSubTab === 'notes' && (
                <div className={styles.grammarNotesSection}>
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((item, index) => <PrefixCard key={index} item={item} />)
                    ) : (
                        <p>No prefix notes found matching your search.</p>
                    )}
                </div>
            )}
        </div>
    );
}