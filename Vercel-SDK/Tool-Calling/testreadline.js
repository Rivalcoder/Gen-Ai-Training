import { google } from '@ai-sdk/google';
import { generateText, tool } from 'ai';
import dotenv from 'dotenv';
import { z } from 'zod';
import Airtable from 'airtable';
import readline from 'readline';

dotenv.config({ path: '.env' });

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getUserInput(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function Storeintable(Title, Description) {
  try {
    const record = await base('Appointments').create({
      'Title': Title,
      'Description': Description || '',
      'Start Time': new Date().toISOString(),
      'End Time': new Date().toISOString()
    });
    console.log("Stored Data in Airtable");
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

async function Fetchdatafromtable(Title) {
  try {
    const records = await base('Appointments')
      .select({})
      .all();
    if (records.length === 0) {
      return {
        success: true,
        message: "No matching records found"
      };
    }

    const formattedRecords = records.map(record => ({
      id: record.id,
      title: record.fields.Title,
      description: record.fields.Description,
      startTime: record.fields['Start Time'],
      endTime: record.fields['End Time']
    }));

    return {
      success: true,
      message: `Found ${records.length} matching records: ${JSON.stringify(formattedRecords, null, 2)}`
    };
  } catch (err) {
    console.error("Error fetching data:", err);
    return {
      success: false,
      message: `Failed to fetch data: ${err.message}`
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

  Fetchdatafromtable: tool({
    description: "Fetch data from Airtable",
    parameters: z.object({
      Title: z.string().describe("Search any meeting or schedule or any relavant data User Given Data search")
    }),
    execute: async ({ Title }) => Fetchdatafromtable(Title)
  })
};

// Initialize conversation history
const messages = [
  {
    role: "system",
    content: `You are a task management assistant. Your job is to help users manage their tasks and appointments.      

    Based on the user's input, you need to:
    1. If the user provides a task and description, use Storeintable to save it
    2. If the user asks about existing tasks or appointments, use Fetchdatafromtable to retrieve them
    
    Provide a natural, conversational response that:
    - Confirms the action taken
    - Shares the relevant information
    - Acknowledges the user's request`
  }
];

async function mainLoop() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    console.error('API Key is missing! Please check your .env file.');
    return;
  }

  while (true) {
    try {
      const userInput = await getUserInput('Enter your input: ');
      
      // Add user message to history
      messages.push({
        role: "user",
        content: userInput
      });
      
      console.log('Processing your request...');
      
      const result = await generateText({
        model: google('gemini-1.5-pro-latest'),
        messages: messages, // Use the message history instead of prompt
        tools: tools,
        temperature: 0.7,
        maxSteps: 2,
      });
      
      console.log("Assistant:", result.text);
      
      // Add assistant response to history
      messages.push({
        role: "assistant",
        content: result.text
      });
      
      // Add any tool messages to history
      if (result.response && result.response.messages) {
        // Filter out messages that are already in the history
        const newMessages = result.response.messages.filter(
          msg => msg.role !== "user" && msg.role !== "system"
        );
        messages.push(...newMessages);
      }
      
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
}

mainLoop();   