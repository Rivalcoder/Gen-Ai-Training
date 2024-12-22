### Generative AI Chatbot With Previous Chat History

This project implements a Generative AI model to create an interactive chatbot that responds to user queries in real time. The chatbot uses the Google Generative AI model to generate responses based on user input. The chat history is maintained to provide context to the conversation.

---

### Requirements

- Node.js
- Google Generative AI Library (`@google/generative-ai`)
- `readline` module

---

### Installation


1. **Install Dependencies:**

    ```bash
    npm install @google/generative-ai readline
    ```

2. **Configure API Key:**

    Ensure you have a valid Google Generative AI API key and configure it in your script.

---

### Usage

1. **Run the Script:**

    ```bash
    node main.js
    ```

2. **Enter Your Query:**

    When prompted, input your question to interact with the chatbot. For example:
    ```
    Question to ask: What is the capital of France?
    ```

3. **View the Response:**

    The generated response will be displayed on the terminal, and the conversation will continue.

4. **Chat History:**

    The chatbot maintains a history of the conversation to provide context for future queries.

---
