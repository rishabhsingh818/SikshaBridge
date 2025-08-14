'use server';
/**
 * @fileOverview A flow to generate multiple-choice questions from textbook content.
 *
 * - generateMCQs - A function that takes an image and/or text and returns a quiz.
 * - GenerateMCQsInput - The input type for the generateMCQs function.
 * - GenerateMCQsOutput - The return type for the generateMCQs function.
 * - QuizQuestion - The type for a single quiz question.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMCQsInputSchema = z.object({
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of a textbook page, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().optional().describe('Text content from a textbook.'),
});
export type GenerateMCQsInput = z.infer<typeof GenerateMCQsInputSchema>;

const QuizQuestionSchema = z.object({
    questionText: z.string().describe('The text of the multiple-choice question.'),
    options: z.array(z.string()).describe('An array of possible answers.'),
    correctAnswer: z.string().describe('The correct answer from the options array.'),
    explanation: z.string().describe('A brief explanation for why the answer is correct.'),
});
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

const GenerateMCQsOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema).describe('An array of generated multiple-choice questions.'),
});
export type GenerateMCQsOutput = z.infer<typeof GenerateMCQsOutputSchema>;


export async function generateMCQs(input: GenerateMCQsInput): Promise<GenerateMCQsOutput> {
  return generateMCQsFlow(input);
}


const prompt = ai.definePrompt({
  name: 'generateMCQsPrompt',
  input: {schema: GenerateMCQsInputSchema},
  output: {schema: GenerateMCQsOutputSchema},
  prompt: `You are an expert quiz creator. Your task is to analyze the provided image of a textbook page and/or the accompanying text and generate a set of multiple-choice questions (MCQs) to test a student's understanding.

If an image is provided, analyze the text and any diagrams within it. If text is provided, use that as the source. If both are provided, consider them together.

Generate 5 relevant MCQs. Each question should have 4 options. For each question, provide the question text, the options, the correct answer, and a brief explanation for why the answer is correct.

{{#if photoDataUri}}
Image of textbook page:
{{media url=photoDataUri}}
{{/if}}

{{#if description}}
Text from textbook:
{{{description}}}
{{/if}}

Return the result in the specified JSON format.`,
});

const generateMCQsFlow = ai.defineFlow(
  {
    name: 'generateMCQsFlow',
    inputSchema: GenerateMCQsInputSchema,
    outputSchema: GenerateMCQsOutputSchema,
  },
  async input => {
    if (!input.photoDataUri && !input.description) {
      throw new Error('Either an image or a description must be provided.');
    }
    
    const {output} = await prompt(input);
    return output!;
  }
);
