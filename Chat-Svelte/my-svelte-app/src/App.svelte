<script>
	import { GoogleGenerativeAI } from '@google/generative-ai';
  
	let apiKey = "KEY"; // Replace with your actual API key
	let genAI = new GoogleGenerativeAI(apiKey);
	let model = genAI.getGenerativeModel({
	  model: "gemini-1.5-flash",
	  generationConfig: {
		temperature: 1,
		topP: 0.95,
		topK: 64,
		maxOutputTokens: 8192,
		responseMimeType: "text/plain",
	  },
	});
	
	let question = "";
	let history1 = [];
	let response = "";
	
	async function run() {
	  const chatSession = model.startChat({
		history: history1,
	  });
	  
	  const prompt = `Provide an answer for the following question: "${question}".`;
  
	  try {
		const result = await chatSession.sendMessage(prompt);
		history1.push({
		  role: "user",
		  parts: [{ text: question }]
		});
		response = (await result.response.text()).replace(/\*/g, '').trim();
		history1.push({
		  role: "model",
		  parts: [{ text: response }]
		});
	  } catch (error) {
		console.error("Error generating response:", error);
		response = "Error generating response.";
	  }
	}
	function handleKeyPress(event) { if (event.key === "Enter") { run(); } }
  </script>
  
  <style>
	main {
	  padding: 1rem;
	  font-family: Arial, sans-serif;
	}
	.response {
	  margin-top: 1rem;
	  padding: 1rem;
	  background: #f0f0f0;
	  border: 1px solid #ccc;
	  border-radius: 5px;
	}
  </style>
  
  <main>
	<h1>Svelte Chat with Generative AI</h1>
	<input bind:value={question} on:keydown={handleKeyPress} placeholder="Enter your question" />
	<button  on:click={run}>Ask</button>
	{#if response}
	  <div class="response">
		<strong>Response:</strong>
		<p>
			{question}
		</p>
		<p>{response}</p>
	  </div>
	{/if}
  </main>
  