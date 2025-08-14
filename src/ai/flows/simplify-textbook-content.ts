'use server';
/**
 * @fileOverview A flow to simplify textbook content.
 *
 * - simplifyTextbookContent - A function that takes an image and/or text and returns a simplified explanation.
 * - SimplifyTextbookContentInput - The input type for the simplifyTextbookContent function.
 * - SimplifyTextbookContentOutput - The return type for the simplifyTextbookContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimplifyTextbookContentInputSchema = z.object({
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of a textbook page, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().optional().describe('Text content from a textbook.'),
});
export type SimplifyTextbookContentInput = z.infer<typeof SimplifyTextbookContentInputSchema>;

const SimplifyTextbookContentOutputSchema = z.object({
  simplifiedText: z.string().describe('The simplified explanation of the textbook content.'),
});
export type SimplifyTextbookContentOutput = z.infer<typeof SimplifyTextbookContentOutputSchema>;


export async function simplifyTextbookContent(input: SimplifyTextbookContentInput): Promise<SimplifyTextbookContentOutput> {
  return simplifyTextbookContentFlow(input);
}


const prompt = ai.definePrompt({
  name: 'simplifyTextbookContentPrompt',
  input: {schema: SimplifyTextbookContentInputSchema},
  output: {schema: SimplifyTextbookContentOutputSchema},
  prompt: `You are an expert educator who can simplify complex textbook material for students. Your task is to analyze the provided image of a textbook page and/or the accompanying text and generate a clear, concise, and easy-to-understand explanation of the core concepts.

If an image is provided, analyze the text and any diagrams within it. If text is provided, use that as the source. If both are provided, consider them together to form a comprehensive understanding.

Break down jargon, use analogies, and focus on making the information accessible and engaging.

{{#if photoDataUri}}
Image of textbook page:
{{media url=photoDataUri}}
{{/if}}

{{#if description}}
Text from textbook:
{{{description}}}
{{/if}}

Provide the simplified explanation in the 'simplifiedText' field.`,
});

const simplifyTextbookContentFlow = ai.defineFlow(
  {
    name: 'simplifyTextbookContentFlow',
    inputSchema: SimplifyTextbookContentInputSchema,
    outputSchema: SimplifyTextbookContentOutputSchema,
  },
  async input => {
    if (!input.photoDataUri && !input.description) {
      throw new Error('Either an image or a description must be provided.');
    }
    
    const {output} = await prompt(input);
    return output!;
  }
);