import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function run() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  try {
    console.log('Starting streamText...');
    const result = await streamText({
      model: google('gemini-1.5-pro-latest'),
      prompt: 'Write a Generative ai and its Roadmap',
      apiKey: apiKey
    });

    const textStream = result.textStream;
    for await (const textPart of textStream) {
      console.log(textPart);
    }
  } catch (error) {
    console.error('Error in streamText:', error);
  }
}

run();
