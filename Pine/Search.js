import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
  apiKey: 'pcsk_6TQn9a_Mfvh7oswfiVSUe3ipPnNDyeaNQkDQn1cRGVLoyyxJfiBtZj5F5BtgTNjHLydAvf',
});
const index = pc.index('indi');

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyCU6e_tCYt8khtlV3govGAq0jX4hhQa6Bg");

const model = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

const content="book";
const result = await model.embedContent(content);

  const response = await index.namespace("ns1").query({
  topK: 10,
  vector: result.embedding.values,
  includeValues: true,
  includeMetadata: true,
});

console.log(response);
