import os
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI

# 🔐 Set your Google Gemini API Key
os.environ["GOOGLE_API_KEY"] = "AIzaSyCzM7a3ZKWIpIajNUauxEz8goa1ZrJLGzc"

# 📄 Load the text document
file_path = "sample.txt"
if not os.path.exists(file_path):
    print(f"❌ File '{file_path}' not found.")
    exit()

loader = TextLoader(file_path)
documents = loader.load()

print(f"✅ Loaded {len(documents)} document(s).")

# ✂️ Split text into chunks
text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
texts = text_splitter.split_documents(documents)

print(f"✅ Split into {len(texts)} chunks.")
print("📄 First chunk:\n", texts[0].page_content[:300])

# 🧠 Embed and store in FAISS
print("🔍 Creating vector store...")
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
db = FAISS.from_documents(texts, embeddings)

# 🤖 Create a Gemini-based RetrievalQA chain
retriever = db.as_retriever()
qa = RetrievalQA.from_chain_type(
    llm=ChatGoogleGenerativeAI(model="gemini-2.0-flash"),
    chain_type="stuff",
    retriever=retriever,
    verbose=True
)

# 💬 Ask questions in loop
print("\n💬 Ask questions (type 'exit' to quit)")
while True:
    question = input("Your question: ")
    if question.lower() == "exit":
        print("👋 Goodbye!")
        break
    try:
        response = qa.run(question)
        print("🤖 Answer:", response)
    except Exception as e:
        print("❌ Error during question answering:", e)
        break
