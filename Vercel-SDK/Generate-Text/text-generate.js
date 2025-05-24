import { google } from '@ai-sdk/google';
import { generateText, streamText } from 'ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function run() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  try {
    console.log('Started Generating Text...');
    const result = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: 'Write a Generative ai and its Roadmap',
      apiKey: apiKey
    });

    const text = result.text;
     console.log(text);    
  } catch (error) {
    console.error('Error in Text Generation:', error);
  }
}

run();
