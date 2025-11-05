// src/components/vocabulary/DaCompounds.js

import React, { useState, useEffect } from 'react';
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
        physicalExplain: "Physical attachment — picture hangs on the wall."
    },
    {
        word: "dafür", meaning: "for it / in favor of it",
        abstract: "Ich bin dafür.",
        abstract_trans: "(I am in favor of it.)",
        abstractExplain: "Support for a proposal — ‘für’ marks favor.",
        physical: "Das Geld ist dafür bestimmt.",
        physical_trans: "(The money is intended for it.)",
        physicalExplain: "Allocation — money is intended for something."
    },
    {
        word: "davon", meaning: "of it / from it",
        abstract: "Ich habe genug davon.",
        abstract_trans: "(I have enough of it.)",
        abstractExplain: "Partitive — enough of a thing or idea.",
        physical: "Er nimmt ein Stück davon.",
        physical_trans: "(He takes a piece of it.)",
        physicalExplain: "Extraction — a piece from a whole (e.g., cake)."
    },
    {
        word: "dazu", meaning: "to it / in addition",
        abstract: "Hast du etwas dazu zu sagen?",
        abstract_trans: "(Do you have anything to say about that?)",
        abstractExplain: "Adding a comment to a topic — ‘zu’ marks relation.",
        physical: "Der Schlüssel gehört dazu.",
        physical_trans: "(The key belongs to it.)",
        physicalExplain: "Belonging — key is part of the system."
    },
    {
        word: "dabei", meaning: "with it / present",
        abstract: "Er war nicht dabei.",
        abstract_trans: "(He was not present/there.)",
        abstractExplain: "Non-presence at an event — ‘bei’ marks attendance.",
        physical: "Hast du dein Handy dabei?",
        physical_trans: "(Do you have your phone with you?)",
        physicalExplain: "Having something with you physically."
    },
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
            {filteredData.map((item, index) => <DaWoCard key={index} item={item} type="da-compound" />)}
        </div>
    );
}