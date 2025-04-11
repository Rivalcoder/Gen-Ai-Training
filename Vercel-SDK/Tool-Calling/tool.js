import { google } from '@ai-sdk/google';
import { generateText, tool } from 'ai';
import dotenv from 'dotenv';
import { z } from 'zod';
import Airtable from 'airtable';

dotenv.config({ path: '.env' });

// Setup Airtable client
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

async function Storeintable(Title, Description) {
  try {
    const record = await base('Appointments').create({
      'Title': Title,
      'Description': Description || '',
      'Start Time': new Date().toISOString(),
      'End Time': new Date().toISOString()
    });

    return {
      success: true,
      message: `Data stored in Airtable with ID: ${record.id}`
    };
  } catch (err) {
    return {
      success: false,
      message: `Failed to store data: ${err.message}`
    };
  }
}

const tools = {
  Storeintable: tool({
    description: "Store data in Airtable",
    parameters: z.object({ 
      Title: z.string().describe("The title of the record"),
      Description: z.string().describe("The description of the record")
    }),
    execute: async ({ Title, Description }) => Storeintable(Title, Description),
  }),
};

async function run() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    console.error('API Key is missing! Please check your .env file.');
    return;
  }

  try {
    console.log('Invoking Text Generation Tool...');
    
    const result = await generateText({
      model: google('gemini-1.5-pro-latest'),
      prompt: `By using the tools, store the data in the table from the User Input Given Title and Description 
               Title:Learn Deepseek
               Description:Learn Deepseek from the scratch`,
      tools: tools,
    });

    console.log(result.text);
  } catch (error) {
    throw new Error(`Text Generation Tool Error: ${error.message}`);
  }
}

run();