const { GoogleGenerativeAI } = require("@google/generative-ai");
const mysql = require('mysql2');
const apiKey = "KEY";
const genAI = new GoogleGenerativeAI(apiKey);

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "********",
    database: "data"
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

async function fetchDataFromDatabase() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM menu', (error, results) => {
            if (error) {
                return reject(error);
            }
            const data = results.map(row => JSON.stringify(row)).join(', ');
            resolve(data);
        });
    });
}

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    tools: { fetchDataFromDatabase }
});

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function processQuestion(question) {
    try {
        const chatSession = model.startChat({ history: [] });

        const result = await chatSession.sendMessage(question, { tools: ['fetchDataFromDatabase'] });

        console.log(result.response.text());
    } catch (error) {
        console.error("Error processing question:", error);
    } finally {
        loop();
    }
}

function loop() {
    rl.question('Question to ask: ', function (input) {
        processQuestion(input);
    });
}

loop();
