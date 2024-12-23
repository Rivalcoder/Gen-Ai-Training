import { google } from '@ai-sdk/google';
import { generateText, streamText } from 'ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function run() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  try {
    console.log('Started Generating Text...');
    const result = await generateText({
      model: google('gemini-1.5-pro-latest'),
      prompt: 'Give me a short story.',
      system:'Your an expert in code Analyst and provide only Answers Related to Coding problems else provide I am code expert Only So i can provide Code related Solutions..',
      apiKey: apiKey
    });

    const text = result.text;
    console.log(text);
    
  } catch (error) {
    console.error('Error in Text Generation:', error);
  }
}

run();
