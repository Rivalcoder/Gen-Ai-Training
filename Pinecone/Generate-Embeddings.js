import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyCU6e_tCYt8khtlV3govGAq0jX4hhQa6Bg");
const model = genAI.getGenerativeModel({
  model: "text-embedding-004",
});
const content="A book Named Mysterious Islands";
const result = await model.embedContent(content);

console.log(result.embedding.values);