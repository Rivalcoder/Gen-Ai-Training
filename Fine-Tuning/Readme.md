### Generative AI Code Assistant

This project implements a Generative AI model to provide code solutions based on user queries. The model uses Google Generative AI to generate code snippets in various programming languages. User inputs are stored along with the generated responses in a JSON file for later reference.

---

### 📝 Introduction

This project leverages Google Generative AI to create an interactive code assistant that generates and executes code based on user queries. The assistant supports multiple programming languages and stores each query-response pair with a timestamp in a JSON file.

---

### 📦 Requirements

- Python 3.x
- Google Generative AI Library (`google-generativeai`)
- JSON Library
- `os`, `datetime`

---

### 🚀 Installation


1. **Install Dependencies:**

    ```bash
    pip install google-generativeai
    ```

2. **Configure API Key:**

    Ensure you have a valid Google Generative AI API key and configure it in your script.

---

### 💻 Usage

1. **Run the Script:**

    ```bash
    python main.py
    ```

2. **Enter Your Query:**

    When prompted, input your program question along with the desired programming language. For example:
    ```
    Enter the Program Question to search on internet (Provide the language at last): Write a function to reverse a string in Python
    ```

3. **View the Response:**

    The generated response will be displayed on the terminal and also saved in `doc.txt` in JSON format.

---

### 🌟 Features

- **Interactive Input:** Enter program questions in various programming languages.
- **Generative AI:** Utilizes Google Generative AI for generating code.
- **Timestamped Records:** Stores queries and responses with timestamps.
- **JSON Storage:** Maintains a JSON file for all interactions.

---


