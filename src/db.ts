import { Collection, Document, MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();


const uri_thedp = process.env.DP;
const uri_34st =  process.env.ST;
const uri_utb =  process.env.UTB;

const ClientTheDP = new MongoClient(uri_thedp);
const Client34St = new MongoClient(uri_34st);
const ClientUTB = new MongoClient(uri_utb);

const dpArticles = ClientTheDP.db('Cluster').collection('articles')
const _34stArticles = Client34St.db('Cluster').collection('articles')
const utbArticles = ClientUTB.db('Cluster').collection('articles')

const articles = {
  "dp": dpArticles, 
  "34st": _34stArticles, 
  "utb": utbArticles
}

export default articles;

// export default async (db: string, fn: (a: Collection<Document>) => void) => {
//   let client: MongoClient;
//   if (db === 'thedp') client = ClientTheDP;
//   else if (db === '34st') client = Client34St;
//   else if (db === 'utb') client = ClientUTB;
//   else {
//     throw new Error('INVALID DB NAME. Must be (thedp, 34st, utb)');
//   }

//   try {
//     const database = client.db('Cluster');
//     const articles = database.collection('articles');
//     await fn(articles);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// };
