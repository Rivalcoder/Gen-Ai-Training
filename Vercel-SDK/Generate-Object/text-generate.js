import { google } from '@ai-sdk/google';
import { generateText, streamText ,generateObject} from 'ai';
import dotenv from 'dotenv';
import { z } from 'zod';


dotenv.config({ path: '.env.local' });

async function run() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  try {
    console.log('Started Generating Text...');
    const result = await await generateObject({
      model: google('gemini-2.0-flash-exp'),
      schema: z.object({
        recipe: z.object({
          name: z.string(),
          ingredients: z.array(
            z.object({
              name: z.string(),
              amount: z.string(),
            }),
          ),
          steps: z.array(z.string()),
        }),
      }),
      prompt: 'Generate a lasagna recipe.',
      apiKey: apiKey,
    });
    console.log(JSON.stringify(result.object.recipe,null,2));
    
  } catch (error) {
    console.error('Error in Text Generation:', error);
  }
}

run();
