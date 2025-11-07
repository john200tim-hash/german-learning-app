// src/components/vocabulary/DaCompounds.js

import React, { useState, useEffect } from 'react';
import styles from '../../styles/Layout.module.css';
import DaWoCard from '../../components/lessons/DaWoCard';

const daCompoundsData = [
    {
        word: "damit", meaning: "with it / so that",
        abstract: "Er spart Geld, damit er reisen kann.",
        abstract_trans: "(He saves money so that he can travel.)",
        abstractExplain: "‘damit’ introduces a purpose clause — saving leads to traveling.",
        physical: "Ich schreibe einen Brief damit.",
        physical_trans: "(I am writing a letter with it.)",
        physicalExplain: "‘damit’ refers to the tool used — the pen."
    },
    {
        word: "daran", meaning: "on it / about it",
        abstract: "Denkst du oft daran?",
        abstract_trans: "(Do you think about it often?)",
        abstractExplain: "Mental focus on a topic — ‘an’ governs thought.",
        physical: "Das Bild hängt daran.",
        physical_trans: "(The picture hangs on it.)",
        physicalExplain: "‘daran’ refers to the physical object — the wall."
    },
    {
        word: "darauf", meaning: "on it / for it",
        abstract: "Ich warte darauf.",
        abstract_trans: "(I am waiting for it.)",
        abstractExplain: "‘darauf’ refers to an event or situation.",
        physical: "Das Buch liegt darauf.",
        physical_trans: "(The book is lying on it.)",
        physicalExplain: "‘darauf’ refers to the physical object — the table."
    },
    {
        word: "daraus", meaning: "from it / out of it",
        abstract: "Was schließt du daraus?",
        abstract_trans: "(What do you conclude from it?)",
        abstractExplain: "‘daraus’ refers to a conclusion drawn from information.",
        physical: "Er trinkt Wasser daraus.",
        physical_trans: "(He drinks water out of it.)",
        physicalExplain: "‘daraus’ refers to the physical object — the glass."
    },
    {
    word: "darüber",
    meaning: "about it / over it",
    abstract: "Wir sprechen oft darüber, wie wichtig Bildung ist.",
    abstract_trans: "(We often talk about how important education is.)",
    abstractExplain: "‘darüber’ refers to the topic of discussion — education.",
    physical: "Die Katze springt darüber.",
    physical_trans: "(The cat jumps over it.)",
    physicalExplain: "‘darüber’ refers to a physical object being jumped over."
  },
  {
    word: "davor",
    meaning: "in front of it / before it",
    abstract: "Ich habe Angst davor, zu versagen.",
    abstract_trans: "(I am afraid of failing.)",
    abstractExplain: "‘davor’ refers to the abstract fear of failure.",
    physical: "Das Auto steht direkt davor.",
    physical_trans: "(The car is parked right in front of it.)",
    physicalExplain: "‘davor’ refers to a physical location in front of something."
  },
  {
    word: "dagegen",
    meaning: "against it / in contrast",
    abstract: "Viele sind dagegen, die Steuern zu erhöhen.",
    abstract_trans: "(Many are against raising taxes.)",
    abstractExplain: "‘dagegen’ expresses opposition to an idea or proposal.",
    physical: "Er lehnt sich dagegen.",
    physical_trans: "(He leans against it.)",
    physicalExplain: "‘dagegen’ refers to a physical surface being leaned on."
  },
  {
    word: "dabei",
    meaning: "with it / at the same time",
    abstract: "Ich war dabei, als es passiert ist.",
    abstract_trans: "(I was there when it happened.)",
    abstractExplain: "‘dabei’ refers to being present during an event.",
    physical: "Ich habe mein Handy dabei.",
    physical_trans: "(I have my phone with me.)",
    physicalExplain: "‘dabei’ refers to carrying something physically."
  },
  {
    word: "dabei",
    meaning: "with it / present",
    abstract: "Ich war dabei, als sie ankamen.",
    abstract_trans: "(I was there when they arrived.)",
    abstractExplain: "‘dabei’ expresses presence during an event.",
    physical: "Ich habe mein Handy dabei.",
    physical_trans: "(I have my phone with me.)",
    physicalExplain: "‘dabei’ refers to physically carrying something."
  },
  {
    word: "dafür",
    meaning: "for it / in favor of it",
    abstract: "Ich bin dafür, dass wir früher anfangen.",
    abstract_trans: "(I’m in favor of starting earlier.)",
    abstractExplain: "‘dafür’ expresses support for an idea.",
    physical: "Das ist das Werkzeug dafür.",
    physical_trans: "(That’s the tool for it.)",
    physicalExplain: "‘dafür’ refers to the purpose of a physical object."
  },
  {
    word: "dagegen",
    meaning: "against it / in contrast",
    abstract: "Viele sind dagegen, die Regeln zu ändern.",
    abstract_trans: "(Many are against changing the rules.)",
    abstractExplain: "‘dagegen’ expresses opposition to a proposal.",
    physical: "Er lehnt sich dagegen.",
    physical_trans: "(He leans against it.)",
    physicalExplain: "‘dagegen’ refers to a surface being leaned on."
  },
  {
    word: "danach",
    meaning: "after it / according to it",
    abstract: "Ich sehne mich danach, frei zu sein.",
    abstract_trans: "(I long to be free.)",
    abstractExplain: "‘danach’ refers to a desired abstract state.",
    physical: "Wir essen und gehen danach spazieren.",
    physical_trans: "(We eat and then go for a walk.)",
    physicalExplain: "‘danach’ refers to a sequence of physical actions."
  },
  {
    word: "davon",
    meaning: "from it / about it",
    abstract: "Ich habe genug davon.",
    abstract_trans: "(I’ve had enough of it.)",
    abstractExplain: "‘davon’ refers to an abstract concept like stress or noise.",
    physical: "Er nimmt etwas davon.",
    physical_trans: "(He takes some of it.)",
    physicalExplain: "‘davon’ refers to a physical quantity or substance."
  },
  {
    word: "dazu",
    meaning: "to it / in addition",
    abstract: "Was sagst du dazu?",
    abstract_trans: "(What do you say about it?)",
    abstractExplain: "‘dazu’ refers to a topic or idea being discussed.",
    physical: "Ich brauche einen Schlüssel dazu.",
    physical_trans: "(I need a key for it.)",
    physicalExplain: "‘dazu’ refers to a physical object that complements another."
  },
  {
    word: "darüber",
    meaning: "about it / over it",
    abstract: "Wir diskutieren darüber.",
    abstract_trans: "(We’re discussing it.)",
    abstractExplain: "‘darüber’ refers to the topic of discussion.",
    physical: "Die Katze springt darüber.",
    physical_trans: "(The cat jumps over it.)",
    physicalExplain: "‘darüber’ refers to a physical object being jumped over."
  },
  {
    word: "davor",
    meaning: "before it / in front of it",
    abstract: "Ich habe Angst davor.",
    abstract_trans: "(I’m afraid of it.)",
    abstractExplain: "‘davor’ refers to an abstract fear or event.",
    physical: "Das Auto steht direkt davor.",
    physical_trans: "(The car is parked right in front of it.)",
    physicalExplain: "‘davor’ refers to a physical location."
  }
];

export default function DaCompounds({ searchTerm }) {
    const [filteredData, setFilteredData] = useState(daCompoundsData);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = daCompoundsData.filter(item =>
            (item.word && item.word.toLowerCase().includes(term)) ||
            (item.meaning && item.meaning.toLowerCase().includes(term))
        );
        setFilteredData(filtered);
    }, [searchTerm]);

    return (
        <div>
            <div className={styles.videoPreviewContainer}>
                <h3 className={styles.videoPreviewTitle}>Video Lesson 1: Da-Compounds</h3>
                <div className={styles.videoWrapper}>
                    <iframe
                        src="https://www.youtube.com/embed/ADzAWTkfIH4"
                        title="YouTube video player for Da-Compounds (Part 1)"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
            <div className={styles.videoPreviewContainer}>
                <h3 className={styles.videoPreviewTitle}>Video Lesson 2: Da-Compounds</h3>
                <div className={styles.videoWrapper}>
                    <iframe
                        src="https://www.youtube.com/embed/WODrTdFaaS8"
                        title="YouTube video player for Da-Compounds (Part 2)"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
            {filteredData.map((item, index) => <DaWoCard key={index} item={item} type="da-compound" />)}
        </div>
    );
}
