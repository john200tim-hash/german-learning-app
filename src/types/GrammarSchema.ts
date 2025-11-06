// src/types/GrammarSchema.ts

/**
 * Defines the structure for Noun, Verb, and Adjective data.
 * This can be a TypeScript interface or a JSON Schema definition.
 */
export interface Noun {
  german: string;
  plural: string;
  article: 'der' | 'die' | 'das';
}