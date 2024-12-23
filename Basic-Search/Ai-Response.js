const {GoogleGenerativeAI} = require("@google/generative-ai");
  
  const apiKey = "KEY";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        
      ],
    });
  
    const handleUserInput = async () => {
      rl.question("Enter your text here: ", async (input) => {
        const result = await chatSession.sendMessage(input);
        console.log("AI Response:", result.response.text());
          handleUserInput();
      });
    };
  
    handleUserInput();
  }
  run();
  