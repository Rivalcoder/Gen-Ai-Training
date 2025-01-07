import { google } from '@ai-sdk/google';
import { generateText, streamText } from 'ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });


export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

      try {
            async function run() {
              const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

            try {
              console.log('Started Generating Text...');
              const result = await generateText({
                model: google('gemini-1.5-pro-latest'),
                prompt: prompt,
                apiKey: apiKey
              });

              const text = result.text;
              console.log(text);
              return res.status(200).json({ text });

            } 
            catch (error) {
              console.error('Error in Text Generation:', error);
            }
            
          }
          
          run()
        }
     catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
