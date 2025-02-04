# Generate Object Using Vercel SDK 🚀

This project utilizes the @ai-sdk/google and ai modules to generate structured responses for fine-tuning tasks. The structured responses include a topic name, a list of sub-topics, and a detailed step-by-step learning process.

## Installation 🛠️
### Clone the repository:
```sh
git clone <repository-url>
cd <repository-folder>
```
```
### Install the required dependencies:
```sh
npm install
```
### Create a .env.local file in the root directory and add your Google Generative AI API key:
```env
GOOGLE_GENERATIVE_AI_API_KEY=your-api-key
```

## Usage 🚀
Run the script to generate a structured response for fine-tuning:
```sh
node index.js
```

## Code Structure 🏗️
- 📦 **Imports**: The script imports necessary modules, including @ai-sdk/google, ai, zod, and dotenv.
- 🌍 **Environment Configuration**: Loads environment variables from the .env.local file.
- 🔄 **Main Function**: Asynchronously runs the main logic of generating structured responses.
  - 🔑 Retrieves the API key from the environment variables.
  - 🌀 Uses `generateObject` from the ai module to generate a structured response using the `gemini-1.5-flash` model.
  - 🔍 Defines a schema using zod to validate the structure of the response.
  - ✍️ Prompts the model to generate a structured response including a topic name, sub-topics, and learning steps.
  - 📜 Logs the generated response.
  - ❗ Error Handling: Catches and logs any errors that occur during the response generation process.

## Example Prompt 💡
```plaintext
Generate a structured response for FineTuning DeepSeek.
Ensure the following:
- Topic name is within 30 characters.
- Provide at least 10 sub-topics.
- Provide at least 10 steps in the learning process with min 100 words each.
```

---