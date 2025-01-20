# Pinecone and Google Generative AI Integration

This project demonstrates how to integrate Pinecone, a vector database, with Google Generative AI to perform operations such as embedding generation, data insertion, querying, and retrieving index statistics.

## Project Structure

### Files in the Folder:
1. **`Insert-data.js`**  
   - Inserts embedding vectors into a Pinecone index.
   - Generates embeddings for a given content using the Google Generative AI text-embedding model.

2. **`search.js`**  
   - Queries the Pinecone index using a vector generated from Google Generative AI embeddings.
   - Retrieves the top K matching vectors with their metadata.

3. **`Find.js`**  
   - Retrieves and prints information about the Pinecone index, including namespace details and statistics.

---

## Prerequisites

1. **Node.js**  
   - Ensure you have Node.js installed on your system.

2. **Install Dependencies**  
   - Install the required libraries:
     ```bash
     npm install @pinecone-database/pinecone @google/generative-ai
     ```

3. **API Keys**  
   - Obtain and set the following API keys:
     - **Pinecone API Key**: Available in your Pinecone account.
     - **Google Generative AI Key**: Available in your Google Cloud Console.

---

## Setup

1. **Environment Variables**  
   - Store API keys securely by creating an `.env` file in the project root:
     ```env
     PINECONE_API_KEY=your-pinecone-api-key
     GOOGLE_AI_API_KEY=your-google-ai-api-key
     ```

2. **Folder Structure**:
   ```plaintext
   /project-folder
   ├── Insert-data.js
   ├── search.js
   ├── Find.js
   ├── README.md
   ├── .env
