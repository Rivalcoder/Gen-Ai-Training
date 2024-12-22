import google.generativeai as genai
import os
import json
from datetime import datetime

genai.configure(api_key="AIzaSyCU6e_tCYt8khtlV3govGAq0jX4hhQa6Bg") 
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction="You are a  professional coder providing code informations.if language Is Mentioned in end solve in the provided language ")

while True:
    a = input("Enter the Program Question to search on internet (Provide the language at last): ")
    now = datetime.now()
    time = now.strftime("%Y-%m-%d %H:%M:%S")
    
    response = model.generate_content(
        (a),
        tools='code_execution'
    )
    
    print(response.text)
    
    data = {
        "timestamp": time,
        "request": a,
        "response": response.text
    }
    
    try:
        with open("doc.txt", "r") as file:
            existing_data = json.load(file)
    except FileNotFoundError:
        existing_data = []
    

    existing_data.append(data)
    with open("doc.txt", "w") as file:
        json.dump(existing_data, file, indent=4)
    
    print("Data has been appended to doc.txt in JSON format.")
