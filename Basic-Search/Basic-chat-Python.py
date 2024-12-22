import os
import google.generativeai as genai

genai.configure(api_key="AIzaSyCU6e_tCYt8khtlV3govGAq0jX4hhQa6Bg")

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  
)

chat_session = model.start_chat(
  history=[
  ]
)
while(1):
    a=input('Enter the text here :')
    response = chat_session.send_message(a)

    print(response.text)