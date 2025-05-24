# 🤖 LangChain Document Processing and Chat Applications

This repository contains a collection of Python scripts that demonstrate various document processing and chat capabilities using LangChain and Google's Gemini AI model. The applications showcase different approaches to document handling, vector storage, and question-answering systems.

## ✨ Features

### 1. 💬 Simple Chat (`simplechat.py`)
- Basic implementation of chat using Google's Gemini model
- Demonstrates system and human message handling
- Supports translation and general conversation

### 2. 🌲 Pinecone Integration (`pincone.py`)
- Implements document processing with Pinecone vector database
- Supports multiple file formats (TXT, PDF, DOCX, CSV, MD)
- Features document chunking and embedding generation
- Implements a question-answering system with Pinecone vector store

### 3. ⚡ Streaming Response (`Stream_Response.py`)
- Implements real-time streaming responses
- Supports multiple document formats
- Uses FAISS for vector storage
- Features streaming output for better user experience

### 4. 📚 Multi-Format Document Processing (`All_fileformat.py`)
- Handles multiple document formats (TXT, PDF, DOCX, CSV, MD)
- Implements document chunking and FAISS vector storage
- Features a question-answering system with Gemini AI

### 5. 📁 Large Folder Text Processing (`largefolder_textfile.py`)
- Specifically designed for processing large folders of text files
- Implements efficient text chunking and FAISS storage
- Features a question-answering system optimized for text documents

### 6. 📄 Single Document Chat (`chat_with_doc.py`)
- Simple implementation for chatting with a single text document
- Features document chunking and FAISS vector storage
- Implements a basic question-answering system

## 🛠️ Prerequisites

- 🐍 Python 3.x
- 🔑 Google Gemini API Key
- 📦 Required Python packages:
  - langchain
  - langchain-google-genai
  - langchain-community
  - faiss-cpu
  - pinecone-client (for Pinecone integration)
  - Additional document processing libraries (pdfplumber, docx2txt, etc.)

## ⚙️ Setup

1. Install required packages:
```bash
pip install langchain langchain-google-genai langchain-community faiss-cpu pinecone-client pdfplumber docx2txt
```

2. Set up your Google Gemini API key:
```python
os.environ["GOOGLE_API_KEY"] = "your-api-key"
```

3. For Pinecone integration, set up your Pinecone API key and environment:
```python
PINECONE_API_KEY = "your-pinecone-api-key"
PINECONE_ENV = "your-pinecone-environment"
```

## 🚀 Usage

Each script can be run independently based on your specific needs:

1. For simple chat:
```bash
python simplechat.py
```

2. For document processing with Pinecone:
```bash
python pincone.py
```

3. For streaming responses:
```bash
python Stream_Response.py
```

4. For multi-format document processing:
```bash
python All_fileformat.py
```

5. For large folder text processing:
```bash
python largefolder_textfile.py
```

6. For single document chat:
```bash
python chat_with_doc.py
```

## 📂 Document Structure

- 📁 Place your documents in the `docs` folder for multi-document processing
- 📄 For single document processing, place your document in the root directory
- 📋 Supported file formats: .txt, .pdf, .docx, .csv, .md

## 📝 Notes

- 🤖 All scripts use Google's Gemini AI model for embeddings and chat
- ✂️ Document chunking is set to 500 characters with 50 character overlap
- 🔄 The question-answering system uses the "stuff" chain type for simpler tasks
- ⚠️ Error handling is implemented throughout the applications
- 💭 Interactive question-answering loops are available in all document processing scripts

## 🔒 Security

- 🔑 Replace the hardcoded API keys with your own keys
- 🔐 Store sensitive credentials in environment variables
- 🛡️ Follow security best practices when handling documents and API keys 