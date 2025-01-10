

Function call 

curl -X POST http://localhost:3000/api/function-calling -H "Content-Type: application/json" -d "{\"message\": \"What is the weather like in New York?\"}"


Tool Call

curl -X POST http://localhost:3000/api/tool-calling -H "Content-Type: application/json" -d "{\"message\": \"Plan a 3-day trip to Miami from New York, departing next Friday. My budget is $200 per night for hotels.\"}"

