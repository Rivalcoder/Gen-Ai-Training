# System Instruction Chat

This script demonstrates how to generate text using the Google Generative AI API with specific system instructions. The system instructions guide the AI to respond in a particular manner.

## Prerequisites

- Node.js and npm (or yarn) installed
- A Google Cloud Platform project with the Generative AI API enabled
- A service account with the necessary permissions
- A `.env.local` file containing your API key:
   GOOGLE_GENERATIVE_AI_API_KEY=<YOUR_API_KEY>



## Installation

1. **Install dependencies:**

  ```bash
  npm install @ai-sdk/google ai dotenv
  ```

## Usage

1. **Run the Script:**

  ```bash
  node instruct.js
  ```

2. **View the Response:**

  The generated response will be displayed on the terminal.

## Script Details

- **System Instruction:** The AI is instructed to act as an expert in code analysis and provide only coding-related answers. If the query is not related to coding, the AI will respond with a message indicating that it can only provide code-related solutions.
- **Prompt:** The script sends a prompt to the AI to generate a short story.
- **Error Handling:** The script includes error handling to catch and log any errors during the text generation process.

