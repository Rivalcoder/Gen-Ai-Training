# Stream Text

This script demonstrates how to stream text using the Google Generative AI API with specific instructions to write about Generative AI and its roadmap.

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
  node stream.js
  ```

2. **View the Response:**

  The generated response will be streamed and displayed on the terminal.

## Script Details

- **System Instruction:** The AI is instructed to write about Generative AI and its roadmap.
- **Prompt:** The script sends a prompt to the AI to write about Generative AI and its roadmap.
- **Error Handling:** The script includes error handling to catch and log any errors during the text streaming process.


