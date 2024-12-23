import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function textGenerationTool({ prompt, modelName, apiKey }) {
  try {
    console.log('Invoking Text Generation Tool...');
    const result = await generateText({
      model: google(modelName),
      prompt: prompt,
      apiKey: apiKey,
    });
    return result.text;
  } catch (error) {
    throw new Error(`Text Generation Tool Error: ${error.message}`);
  }
}

async function run() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    console.error('API Key is missing! Please check your .env.local file.');
    return;
  }

  const toolInput = {
    prompt: 'Create a roadmap for Generative AI development with key milestones.',
    modelName: 'gemini-1.5-pro-latest',
    apiKey: apiKey,
  };

  try {
    const generatedText = await textGenerationTool(toolInput);
    console.log('Generated Text:\n', generatedText);
  } catch (error) {
    console.error(error.message);
  }
}

// Run the program
run();
