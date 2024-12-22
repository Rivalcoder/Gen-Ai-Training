# Generative AI Chatbot With Feed File Functionality

This project implements a Generative AI model to create an interactive chatbot that responds to user queries based on the content of both TXT and PDF files. The chatbot uses the Google Generative AI model to generate responses referencing the file contents.

## Requirements

- Python 3.x
- Google Generative AI Library (`google-generativeai`)
- `PyPDF2` Library

## Installation

1. **Clone the Repository:**

    ```bash
    git clone [Your_Repository_URL]
    cd [Repository_Name]
    ```

2. **Install Dependencies:**

    ```bash
    pip install google-generativeai pypdf2
    ```

3. **Configure API Key:**

    Ensure you have a valid Google Generative AI API key and configure it in your script.

4. **Prepare Content Files:**

    - Create a `yourdata.txt` file with the text content that the AI will reference to answer questions.
    - Create a `yourdata.pdf` file with the PDF content that the AI will reference to answer questions.

## Usage

1. **Run the Script:**

    ```bash
    python main.py
    ```

2. **Enter Your Query:**

    When prompted, input your question to interact with the chatbot.

3. **View the Response:**

    The generated response will be displayed on the terminal, and the conversation will continue.

