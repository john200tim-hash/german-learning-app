// src/types/QuizSchema.ts

/**
 * Defines the structure for the Quiz JSON used by QuizComponent. [4]
 */
export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}