import os
import mimetypes

from langchain_community.document_loaders import (
    TextLoader, PDFPlumberLoader, Docx2txtLoader, CSVLoader, UnstructuredMarkdownLoader
)
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI

# 🔐 Set Gemini API Key
os.environ["GOOGLE_API_KEY"] = "AIzaSyCzM7a3ZKWIpIajNUauxEz8goa1ZrJLGzc"  # Replace with your real key

# 📂 Target folder for documents
folder_path = "docs"
if not os.path.exists(folder_path):
    print(f"❌ Folder '{folder_path}' not found.")
    exit()

# 📄 File extension to loader mapping
loader_map = {
    ".txt": TextLoader,
    ".pdf": PDFPlumberLoader,
    ".docx": Docx2txtLoader,
    ".csv": CSVLoader,
    ".md": UnstructuredMarkdownLoader,
}

all_documents = []

# 🔁 Loop through files and load using appropriate loaders
for filename in os.listdir(folder_path):
    file_path = os.path.join(folder_path, filename)
    ext = os.path.splitext(filename)[1].lower()

    loader_class = loader_map.get(ext)
    if loader_class:
        try:
            loader = loader_class(file_path)
            docs = loader.load()
            all_documents.extend(docs)
            print(f"✅ Loaded {len(docs)} document(s) from '{filename}'.")
        except Exception as e:
            print(f"⚠️ Could not load '{filename}': {e}")
    else:
        print(f"⏩ Skipping unsupported file: {filename}")

if not all_documents:
    print("❌ No supported documents found.")
    exit()

# ✂️ Split documents into chunks
text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
texts = text_splitter.split_documents(all_documents)

print(f"✅ Split into {len(texts)} chunks.")

# 🧠 Create vector store with Gemini embeddings
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
db = FAISS.from_documents(texts, embeddings)

# 🔎 Setup retriever + Gemini QA
retriever = db.as_retriever()
qa = RetrievalQA.from_chain_type(
    llm=ChatGoogleGenerativeAI(model="gemini-2.0-flash"),
    chain_type="stuff",  # Use "stuff" for simpler tasks, "map_reduce" for larger contexts
    retriever=retriever,
    verbose=True
)

# 💬 Ask questions loop
print("\n💬 Ask questions (type 'exit' to quit)")
while True:
    question = input("Your question: ")
    if question.lower() == "exit":
        print("👋 Goodbye!")
        break
    try:
        answer = qa.run(question)
        print("🤖 Answer:", answer)
    except Exception as e:
        print("❌ Error during question answering:", e)
