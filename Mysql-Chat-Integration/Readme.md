### Generative AI Chatbot with MySQL

This project uses a Generative AI model to create an interactive chatbot that connects to a MySQL database. The chatbot uses Google Generative AI to generate responses based on user input and fetches data from the MySQL database.

### Requirements

- Python 3.x or Node.js
- Google Generative AI Library (`google-generativeai` for Python, `@google/generative-ai` for Node.js)
- MySQL Connector Library (`mysql-connector-python` for Python, `mysql2` for Node.js)
- MySQL database

### Installation


1. **Install Dependencies for Python:**

    ```bash
    pip install google-generativeai mysql-connector-python
    ```

    **Install Dependencies for Node.js:**

    ```bash
    npm install @google/generative-ai mysql2
    ```

2. **Configure API Key:**

    Ensure you have a valid Google Generative AI API key and configure it in your script.

3. **Setup MySQL Database:**

    - Ensure your MySQL database is running and has a `menu` table with items.
    - Update the database connection details in the scripts.

### Usage

#### Run the Python Script:

1. **Run the Script:**

    ```bash
    python main.py
    ```

2. **Enter Your Query:**

    When prompted, input your question to interact with the chatbot.

#### Run the Node.js Script:

1. **Run the Script:**

    ```bash
    node main.js
    ```

2. **Enter Your Query:**

    When prompted, input your question to interact with the chatbot.

