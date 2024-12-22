const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = "AIzaSyCU6e_tCYt8khtlV3govGAq0jX4hhQa6Bg";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin,output: process.stdout});

let history1=[]
async function run(question) {
    const chatSession = model.startChat({
         history:history1,       
    });
    const prompt = `Provide a answer for the following question: "${question}".`
    
    try {
        const result = await chatSession.sendMessage(prompt);
        history1.push({
            role: "user",
            parts: [{ text: question }]
        });
        console.log(result.response.text());
        history1.push({
            role: "model",
            parts: [{ text: result.response.text() }]
        });
        loop();
    } catch (error) {
        console.error("Error generating response:", error);
        loop();
    }
}
function loop(){ 
    rl.question('Question to ask: ', function(input) {
        run(input);
        
    });

}
loop();
