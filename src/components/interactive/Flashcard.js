// src/components/interactive/Flashcard.js

import React, { useState } from 'react';

/**
 * Component for vocabulary Q&A or drills.
 */
export default function Flashcard({ question, answer }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flashcard" onClick={() => setIsFlipped(!isFlipped)}>
      {isFlipped ? answer : question}
    </div>
  );
}