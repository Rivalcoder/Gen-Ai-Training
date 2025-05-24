import os
from langchain_community.document_loaders import (
    TextLoader, PDFPlumberLoader, Docx2txtLoader, CSVLoader, UnstructuredMarkdownLoader
)
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.schema.runnable import RunnableLambda
from langchain.schema.output_parser import StrOutputParser

# 🔐 Set Gemini API Key
os.environ["GOOGLE_API_KEY"] = "AIzaSyCzM7a3ZKWIpIajNUauxEz8goa1ZrJLGzc"

# 📂 Load documents
folder_path = "docs"
if not os.path.exists(folder_path):
    print(f"❌ Folder '{folder_path}' not found.")
    exit()

loader_map = {
    ".txt": TextLoader,
    ".pdf": PDFPlumberLoader,
    ".docx": Docx2txtLoader,
    ".csv": CSVLoader,
    ".md": UnstructuredMarkdownLoader,
}

all_documents = []
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

# ✂️ Split documents
text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
texts = text_splitter.split_documents(all_documents)
print(f"✅ Split into {len(texts)} chunks.")

# 🧠 Create vector store
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
db = FAISS.from_documents(texts, embeddings)
retriever = db.as_retriever()

# 🤖 Gemini LLM with streaming
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    model_kwargs={"streaming": True},
    callbacks=[StreamingStdOutCallbackHandler()]
)

# 🔗 Chain to build prompt correctly
def build_prompt(input: dict) -> str:
    docs = retriever.invoke(input["question"])
    context = "\n\n".join([doc.page_content for doc in docs])
    return f"""You are an assistant. Answer the question using the context below.

Context:
{context}

Question: {input["question"]}
Answer:"""

qa_chain = (
    RunnableLambda(build_prompt)
    | llm
    | StrOutputParser()
)

# 💬 Ask user input
print("\n💬 Ask questions (type 'exit' to quit)")
while True:
    question = input("Your question: ")
    if question.lower() == "exit":
        print("👋 Goodbye!")
        break
    try:
        print("🤖 Answer: ", end="", flush=True)
        last = ""
        for chunk in qa_chain.stream({"question": question}):
            delta = chunk[len(last):]
            print(delta, end="", flush=True)
            last = chunk
        print()
    except Exception as e:
        print("❌ Error during question answering:", e)
