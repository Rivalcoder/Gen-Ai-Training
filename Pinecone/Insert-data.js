import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
  apiKey: 'pcsk_6TQn9a_Mfvh7oswfiVSUe3ipPnNDyeaNQkDQn1cRGVLoyyxJfiBtZj5F5BtgTNjHLydAvf',
});

const index = pc.index('indi');

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyCU6e_tCYt8khtlV3govGAq0jX4hhQa6Bg");
const model = genAI.getGenerativeModel({
  model: "text-embedding-004",
  dimension: 768,  //Dimension is Predefined So we Cant Modify this ..
});
const content="Rich Dad Poor Dad Book Is very Curious to Read.";
const result = await model.embedContent(content);

console.log(result.embedding.values);

  try{
    await index.namespace('ns1').upsert([
      { id: `id${Date.now()}`, values:result.embedding.values , metadata: {content : content} },
    ]);
  }
  catch(err)
  { 
    console.log(err)
  }
  finally{
    console.log("Finally Inserted Data ")
  }
