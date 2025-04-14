import { z } from 'zod';
import { generateText, tool } from 'ai';
import { google } from '@ai-sdk/google';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const result = await generateText({
  model:google('gemini-1.5-flash'),
  tools: {
    weather: tool({
      description: 'Get the weather in a location',
      parameters: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      }),
    }),
  },
  prompt: 'What is the weather in San Francisco? If Dont have Access With Give any Random Weather Details. ',
  maxSteps: 2,  // Its is Used Because Tool calling Complete the steps so we need to increase Steps to Get model answer refer screenshot
});
console.log(result.text)