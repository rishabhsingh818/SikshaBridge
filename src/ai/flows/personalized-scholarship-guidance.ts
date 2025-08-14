'use server';
/**
 * @fileOverview Personalized scholarship guidance flow for students.
 *
 * - personalizedScholarshipGuidance - A function that provides personalized scholarship information.
 * - ScholarshipGuidanceInput - The input type for the personalizedScholarshipGuidance function.
 * - ScholarshipGuidanceOutput - The return type for the personalizedScholarshipGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScholarshipGuidanceInputSchema = z.object({
  location: z.string().describe('The student’s location.'),
  grade: z.number().describe('The student’s grade level.'),
});
export type ScholarshipGuidanceInput = z.infer<typeof ScholarshipGuidanceInputSchema>;

const ScholarshipGuidanceOutputSchema = z.object({
  scholarshipInfo: z.string().describe('Details of available scholarships.'),
});
export type ScholarshipGuidanceOutput = z.infer<typeof ScholarshipGuidanceOutputSchema>;

export async function personalizedScholarshipGuidance(input: ScholarshipGuidanceInput): Promise<ScholarshipGuidanceOutput> {
  return personalizedScholarshipGuidanceFlow(input);
}

const getScholarshipInfo = ai.defineTool(
  {
    name: 'getScholarshipInfo',
    description: 'Retrieves scholarship information based on the student’s location and grade.',
    inputSchema: z.object({
      location: z.string().describe('The student’s location.'),
      grade: z.number().describe('The student’s grade level.'),
    }),
    outputSchema: z.string(),
  },
  async function (input) {
    // Placeholder implementation to return scholarship information based on location and grade.
    // In a real application, this would fetch data from a database or external API.
    return `Scholarship information for students in ${input.location} in grade ${input.grade}.`;
  }
);

const prompt = ai.definePrompt({
  name: 'scholarshipGuidancePrompt',
  input: {schema: ScholarshipGuidanceInputSchema},
  output: {schema: ScholarshipGuidanceOutputSchema},
  tools: [getScholarshipInfo],
  prompt: `You are ShikshaBridge, a rural education AI tutor. Provide personalized guidance on available scholarships based on the student's location and grade. Use the getScholarshipInfo tool to get the scholarship information.

Student Location: {{{location}}}
Student Grade: {{{grade}}}
`,
});

const personalizedScholarshipGuidanceFlow = ai.defineFlow(
  {
    name: 'personalizedScholarshipGuidanceFlow',
    inputSchema: ScholarshipGuidanceInputSchema,
    outputSchema: ScholarshipGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
