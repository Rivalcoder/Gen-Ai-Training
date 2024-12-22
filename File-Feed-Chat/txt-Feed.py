import google.generativeai as genai
import os

genai.configure(api_key="AIzaSyCU6e_tCYt8khtlV3govGAq0jX4hhQa6Bg")

model = genai.GenerativeModel("gemini-1.5-flash")

file_path = 'yourdata.txt'

def data(file_path):
    with open(file_path, 'r') as file:
        return file.read()

def save(file_path, data):
    with open(file_path, 'w') as file:
        file.write(data)

content = data(file_path)

while True:
    print(content)
    a = input("Enter the Question to Ask: ")
    prompt = f"Based on the following content only :\n\n{content}\n\nAnswer the question provide false statements also : {a}"
    response = model.generate_content(prompt)
    print(response.text)
    save(file_path, content)
