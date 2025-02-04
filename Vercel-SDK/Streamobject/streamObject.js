import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function run() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  try {

    const {partialObjectStream:object } = await streamObject({
        model:google('gemini-1.5-flash'),
        schema: z.object
                ({
                    Topic: z.object({
                    name: z.string().min(5).max(30),
                    Topics: z.array(z.string()).min(10),
                    Steps: z.array(z.string().min(100)).min(10),
                 }),
        }),
        prompt:`Generate a structured response for FineTuning DeepSeek.
                Ensure the following:
                - Topic name is within 30 characters.
                - Provide at least 10 sub-topics.
                - Provide at least 10 steps in the learning process with min 100 words each.`,
      });

      for await (const partialObject of object) {
        console.log(partialObject);
      }
    }
    catch (error) 
    {
    console.error('Error in streamText:', error);
    }
}

run();