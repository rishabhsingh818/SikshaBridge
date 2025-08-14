'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating multiple-choice questions (MCQs) from textbook content.
 *
 * - generateMCQs - A function that takes textbook content as input and returns a set of MCQs.
 * - GenerateMCQsInput - The input type for the generateMCQs function.
 * - GenerateMCQsOutput - The return type for the generateMCQs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMCQsInputSchema = z.object({
  textbookContent: z.string().describe('The content of the textbook chapter.'),
  numberOfQuestions: z.number().default(5).describe('The number of MCQs to generate.'),
});
export type GenerateMCQsInput = z.infer<typeof GenerateMCQsInputSchema>;

const GenerateMCQsOutputSchema = z.object({
  mcqs: z.array(
    z.object({
      question: z.string().describe('The multiple choice question.'),
      options: z.array(z.string()).describe('The options for the multiple choice question.'),
      answer: z.string().describe('The correct answer to the multiple choice question.'),
    })
  ).describe('The generated multiple choice questions.'),
});
export type GenerateMCQsOutput = z.infer<typeof GenerateMCQsOutputSchema>;

export async function generateMCQs(input: GenerateMCQsInput): Promise<GenerateMCQsOutput> {
  return generateMCQsFlow(input);
}

const generateMCQsPrompt = ai.definePrompt({
  name: 'generateMCQsPrompt',
  input: {schema: GenerateMCQsInputSchema},
  output: {schema: GenerateMCQsOutputSchema},
  prompt: `You are an expert in creating multiple-choice questions (MCQs) based on provided text.

  Your task is to generate {{numberOfQuestions}} MCQs from the following textbook content.
  Each question should have four options, with one correct answer. Ensure that the questions are relevant to the content and cover the key concepts.

  Textbook Content: {{{textbookContent}}}

  Format the output as a JSON object with a 'mcqs' array. Each object in the array should have the following structure:
  {
    "question": "The multiple choice question.",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": "The correct answer to the multiple choice question."
  }
  `,
});

const generateMCQsFlow = ai.defineFlow(
  {
    name: 'generateMCQsFlow',
    inputSchema: GenerateMCQsInputSchema,
    outputSchema: GenerateMCQsOutputSchema,
  },
  async input => {
    const {output} = await generateMCQsPrompt(input);
    return output!;
  }
);
