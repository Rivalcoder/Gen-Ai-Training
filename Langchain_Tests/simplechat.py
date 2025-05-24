import os

if not os.environ.get("GOOGLE_API_KEY"):
    os.environ["GOOGLE_API_KEY"] = "AIzaSyCzM7a3ZKWIpIajNUauxEz8goa1ZrJLGzc"

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage

model = ChatGoogleGenerativeAI(model="gemini-2.0-flash") # Or "gemini-1.5-pro", "gemini-pro"

messages = [
    SystemMessage("Translate the following from English into Tamil."),
    HumanMessage("hi Bro How Are You!"),
]

response = model.invoke(messages)

print(response.content)