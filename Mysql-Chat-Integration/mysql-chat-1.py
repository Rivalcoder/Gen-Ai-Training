import google.generativeai as genai
import mysql.connector
genai.configure(api_key="AIzaSyCU6e_tCYt8khtlV3govGAq0jX4hhQa6Bg")
model = genai.GenerativeModel("gemini-1.5-flash")

def fetch_menu_items():
    try:
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="****",
            database="data"
        )
        cursor = mydb.cursor()
        cursor.execute("SELECT * FROM menu")
        
        items = cursor.fetchall()
        return items
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return []
    finally:
        if mydb.is_connected():
            cursor.close()
            mydb.close()

def get_item_price(item_name):
    for item in menu_items:
        if item[0].lower() == item_name.lower():
            return item[1] 
    return None

menu_items = fetch_menu_items()


while True:
    user_question = input("User: Enter the question to ask: ")
    item_price = get_item_price(user_question)
    
    if item_price is not None:
        response_text = f"The price of {user_question} is {item_price}."
    else:
        response_text = f"Sorry, I couldn't find the price for {user_question}."

    print("AI Response:", response_text)
    