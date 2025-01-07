# 📧 Text Generation App

This is a text generation application built with React and a backend API to process and generate responses using Google's Generative AI.

## ✨ Features

- Real-time text generation based on user input
- API integration for generating text
- Middleware for request validation
- User-friendly interface

## 🛠️ Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Rivalcoder/Middleware.git
    ```

2. Navigate to the project directory:
    ```sh
    cd Text-Generation-App
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Create a `.env` file in the root directory and add your API key:
    ```sh
    GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
    ```

## 📦 Dependencies

Here are the main dependencies used in this project:

- react: ^17.0.2
- react-dom: ^17.0.2
- @ai-sdk/google: ^1.0.0
- dotenv: ^10.0.0
- next: ^12.0.7

You can find the complete list of dependencies in the `package.json` file.

## 🚀 Running the Application

1. Start the development server:
    ```sh
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## 📸 Usage

1. Enter your prompt in the input field.
2. Click the "Send to API" button.
3. View the generated response.

## 🌐 API Endpoints

- **POST** `/api/generate`: Generates text based on the provided prompt.

## 🛡️ Middleware

The middleware function validates the incoming requests to ensure that the `prompt` parameter is present. If the prompt is missing, it returns a `404` error response. Otherwise, it allows the request to proceed.

### Usage of Middleware

- **Best Example**: It used to check the access token is there for every request every time when user request
- **Validation**: Ensures that the required `prompt` parameter is present in the request body.
- **Error Handling**: Returns appropriate error responses for missing or invalid parameters.


### Example Middleware Code

```javascript
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const body = await req.json();
  const prompt = body.prompt;
  console.log(prompt);
  
  if (!prompt) {
    return NextResponse.json(
      { error: 'Prompt is required.' },
      { status: 404 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/generate',
};
```


