import google.generativeai as genai
import PyPDF2
import os

genai.configure(api_key="KEY")

model = genai.GenerativeModel("gemini-1.5-flash")

pdf_file_path = 'yourdata.pdf'

def read_pdf_file(file_path):
    pdf_content = ""
    with open(file_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfFileReader(file)
        for page_num in range(pdf_reader.numPages):
            page = pdf_reader.getPage(page_num)
            pdf_content += page.extract_text()
    return pdf_content

content = read_pdf_file(pdf_file_path)

while True:
    print(content)
    a = input("Enter the Question to Ask: ")
    prompt = f"Based on the following content only:\n\n{content}\n\nAnswer the question providing false statements also: {a}"
    response = model.generate_content(prompt)
    print(response.text)
