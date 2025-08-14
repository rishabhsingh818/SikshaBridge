'use server';
/**
 * @fileOverview This file defines a Genkit flow for simplifying textbook content.
 *
 * - simplifyTextbookContent - A function that takes textbook images and returns simplified explanations in the student's native language.
 * - SimplifyTextbookContentInput - The input type for the simplifyTextbookContent function.
 * - SimplifyTextbookContentOutput - The return type for the simplifyTextbookContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimplifyTextbookContentInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of a textbook page, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'    ),
  nativeLanguage: z.string().describe('The student\'s native language.'),
});
export type SimplifyTextbookContentInput = z.infer<typeof SimplifyTextbookContentInputSchema>;

const SimplifyTextbookContentOutputSchema = z.object({
  simplifiedExplanation: z
    .string()
    .describe('A simplified explanation of the textbook content in the student\'s native language.'),
});
export type SimplifyTextbookContentOutput = z.infer<typeof SimplifyTextbookContentOutputSchema>;

export async function simplifyTextbookContent(
  input: SimplifyTextbookContentInput
): Promise<SimplifyTextbookContentOutput> {
  return simplifyTextbookContentFlow(input);
}

const simplifyTextbookContentPrompt = ai.definePrompt({
  name: 'simplifyTextbookContentPrompt',
  input: {schema: SimplifyTextbookContentInputSchema},
  output: {schema: SimplifyTextbookContentOutputSchema},
  prompt: `You are ShikshaBridge, a rural education AI tutor. Simplify the textbook content in the image into an explanation in the student’s native language, {{{nativeLanguage}}}.

Textbook Page Image: {{media url=photoDataUri}}

Simplified Explanation:`,
});

const simplifyTextbookContentFlow = ai.defineFlow(
  {
    name: 'simplifyTextbookContentFlow',
    inputSchema: SimplifyTextbookContentInputSchema,
    outputSchema: SimplifyTextbookContentOutputSchema,
  },
  async input => {
    const {output} = await simplifyTextbookContentPrompt(input);
    return output!;
  }
);
