import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
  apiKey: 'pcsk_6TQn9a_Mfvh7oswfiVSUe3ipPnNDyeaNQkDQn1cRGVLoyyxJfiBtZj5F5BtgTNjHLydAvf',
});

const index = pc.index('indi');


const indexInfo = await index.describeIndexStats();
console.log(JSON.stringify(indexInfo, null, 2));



