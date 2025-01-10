import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import express from "express"
import 'dotenv/config';

const app = express()
app.use(express.json())

//Key Check
try {
  // your logic
} catch (error) {
  if (LoadAPIKeyError.isInstance(error)) {
    console.error("API Key load error:", error.message);
  } else {
    console.error("Other error:", error.message);
  }
}


// FUNCTION CALLING EXAMPLE
// Simple function calling - AI calls ONE function at a time
async function getFunctionCallingResponse(userMessage) {
  try {
    const result = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: userMessage,
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      functions: {
        // Define a single function for weather
        getWeather: {
          description: "Get the current weather for a location",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "string",
                description: "The city and state, e.g., San Francisco, CA",
              },
              unit: {
                type: "string",
                enum: ["celsius", "fahrenheit"],
                description: "The unit of temperature",
              },
            },
            required: ["location"],
          },
          execute: async ({ location, unit = "fahrenheit" }) => {
            // Simulate API call to weather service
            await new Promise((resolve) => setTimeout(resolve, 1000))

            return {
              location,
              temperature: unit === "celsius" ? 22 : 72,
              condition: "Sunny",
              humidity: "45%",
              unit,
              timestamp: new Date().toISOString(),
            }
          },
        },
      },
    })

    return {
      type: "function_calling",
      userMessage,
      response: result.text,
      functionCalls: result.functionCalls || [],
      functionResults: result.functionResults || [],
      explanation: "Function calling: AI identified and called ONE specific function",
    }
  } catch (error) {
    return { error: error.message }
  }
}

// TOOL CALLING EXAMPLE
// Advanced tool calling - AI can use MULTIPLE tools in sequence
async function getToolCallingResponse(userMessage) {
  try {
    const result = await generateText({
      model: google('gemini-1.5-flash'),
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      prompt: userMessage,
      tools: {
        // Multiple tools that can work together
        searchFlights: {
          description: "Search for flights between two locations",
          parameters: {
            type: "object",
            properties: {
              origin: {
                type: "string",
                description: "Departure city or airport code",
              },
              destination: {
                type: "string",
                description: "Arrival city or airport code",
              },
              date: {
                type: "string",
                description: "Travel date in YYYY-MM-DD format",
              },
            },
            required: ["origin", "destination", "date"],
          },
          execute: async ({ origin, destination, date }) => {
            // Simulate flight search API
            await new Promise((resolve) => setTimeout(resolve, 1500))

            return {
              flights: [
                {
                  airline: "Delta",
                  departure: "08:00",
                  arrival: "11:30",
                  price: 350,
                  duration: "3h 30m",
                },
                {
                  airline: "United",
                  departure: "12:30",
                  arrival: "16:00",
                  price: 420,
                  duration: "3h 30m",
                },
                {
                  airline: "American",
                  departure: "16:45",
                  arrival: "20:15",
                  price: 380,
                  duration: "3h 30m",
                },
              ],
              searchParams: { origin, destination, date },
            }
          },
        },

        searchHotels: {
          description: "Search for hotels in a location",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "string",
                description: "City or area to search for hotels",
              },
              checkIn: {
                type: "string",
                description: "Check-in date in YYYY-MM-DD format",
              },
              checkOut: {
                type: "string",
                description: "Check-out date in YYYY-MM-DD format",
              },
              budget: {
                type: "number",
                description: "Maximum price per night",
              },
            },
            required: ["location", "checkIn", "checkOut"],
          },
          execute: async ({ location, checkIn, checkOut, budget }) => {
            // Simulate hotel search API
            await new Promise((resolve) => setTimeout(resolve, 1200))

            const hotels = [
              { name: "Grand Hotel", rating: 4.5, price: 200, amenities: ["Pool", "Gym", "WiFi"] },
              { name: "City Center Inn", rating: 4.2, price: 150, amenities: ["WiFi", "Breakfast"] },
              { name: "Luxury Suites", rating: 4.8, price: 300, amenities: ["Spa", "Pool", "Concierge"] },
              { name: "Budget Lodge", rating: 3.8, price: 80, amenities: ["WiFi"] },
            ]

            // Filter by budget if provided
            const filteredHotels = budget ? hotels.filter((hotel) => hotel.price <= budget) : hotels

            return {
              hotels: filteredHotels,
              searchParams: { location, checkIn, checkOut, budget },
            }
          },
        },

        getWeatherForecast: {
          description: "Get weather forecast for a location and date",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "string",
                description: "City to get weather forecast for",
              },
              date: {
                type: "string",
                description: "Date for forecast in YYYY-MM-DD format",
              },
            },
            required: ["location"],
          },
          execute: async ({ location, date }) => {
            // Simulate weather API
            await new Promise((resolve) => setTimeout(resolve, 800))

            const conditions = ["Sunny", "Partly Cloudy", "Rainy", "Cloudy"]
            const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]

            return {
              location,
              date: date || new Date().toISOString().split("T")[0],
              forecast: randomCondition,
              temperature: Math.floor(Math.random() * 30) + 60, // 60-90°F
              precipitation: randomCondition === "Rainy" ? "80%" : "10%",
              humidity: Math.floor(Math.random() * 40) + 40 + "%", // 40-80%
            }
          },
        },

        calculateTripBudget: {
          description: "Calculate total trip budget based on flights, hotels, and daily expenses",
          parameters: {
            type: "object",
            properties: {
              flightCost: {
                type: "number",
                description: "Cost of flights",
              },
              hotelCostPerNight: {
                type: "number",
                description: "Hotel cost per night",
              },
              nights: {
                type: "number",
                description: "Number of nights staying",
              },
              dailyExpenses: {
                type: "number",
                description: "Estimated daily expenses for food and activities",
                default: 100,
              },
            },
            required: ["flightCost", "hotelCostPerNight", "nights"],
          },
          execute: async ({ flightCost, hotelCostPerNight, nights, dailyExpenses = 100 }) => {
            const hotelTotal = hotelCostPerNight * nights
            const expensesTotal = dailyExpenses * nights
            const totalBudget = flightCost + hotelTotal + expensesTotal

            return {
              breakdown: {
                flights: flightCost,
                hotels: hotelTotal,
                dailyExpenses: expensesTotal,
                total: totalBudget,
              },
              budgetTips: [
                "Book flights in advance for better deals",
                "Consider hotels slightly outside city center",
                "Look for restaurants with local cuisine for authentic experience",
              ],
            }
          },
        },
      },
    })

    return {
      type: "tool_calling",
      userMessage,
      response: result.text,
      toolCalls: result.toolCalls || [],
      toolResults: result.toolResults || [],
      explanation: "Tool calling: AI used MULTIPLE tools in sequence to solve a complex problem",
    }
  } catch (error) {
    return { error: error.message }
  }
}

// API Routes
app.post("/api/function-calling", async (req, res) => {
  try {
    const { message } = req.body
    console.log("Function Calling Request:", message)

    const response = await getFunctionCallingResponse(message)
    res.json(response)
  } catch (error) {
    console.error("Function calling error:", error)
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/tool-calling", async (req, res) => {
  try {
    const { message } = req.body
    console.log("Tool Calling Request:", message)

    const response = await getToolCallingResponse(message)
    res.json(response)
  } catch (error) {
    console.error("Tool calling error:", error)
    res.status(500).json({ error: error.message })
  }
})

// Test endpoint to show the difference
app.get("/api/demo", (req, res) => {
  res.json({
    message: "AI Function vs Tool Calling Demo",
    endpoints: {
      functionCalling: {
        url: "POST /api/function-calling",
        description: "Single function execution",
        example: "What's the weather in New York?",
        capabilities: ["One function at a time", "Simple task execution"],
      },
      toolCalling: {
        url: "POST /api/tool-calling",
        description: "Multiple tools working together",
        example: "Plan a 3-day trip to Miami from New York, departing next Friday. My budget is $200/night for hotels.",
        capabilities: ["Multiple tools in sequence", "Complex problem solving", "Context awareness between tools"],
      },
    },
    keyDifferences: {
      functionCalling: "AI calls ONE specific function to complete a task",
      toolCalling: "AI can use MULTIPLE tools together to solve complex problems",
    },
  })
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📖 Demo info: GET http://localhost:${PORT}/api/demo`)
  console.log(`🔧 Function calling: POST http://localhost:${PORT}/api/function-calling`)
  console.log(`🛠️  Tool calling: POST http://localhost:${PORT}/api/tool-calling`)
  console.log(`\n💡 Try these examples:`)
  console.log(`Function: "What's the weather in San Francisco?"`)
  console.log(`Tool: "Plan a weekend trip to Miami from NYC, budget $150/night"`)
})

// Export for testing
export { getFunctionCallingResponse, getToolCallingResponse }
