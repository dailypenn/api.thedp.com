import { Collection, Document, MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const USERNAME = process.env.USERNAME || 'luke';
const PASSWORD = process.env.PASSWORD;

const uri_thedp = `mongodb+srv://${USERNAME}:${PASSWORD}@dp.5aehsyo.mongodb.net/?retryWrites=true&w=majority`;
const uri_34st = `mongodb+srv://${USERNAME}:${PASSWORD}@34st.rvmlxes.mongodb.net/?retryWrites=true&w=majority`;
const uri_utb = `mongodb+srv://${USERNAME}:${PASSWORD}@utb.rjdlubs.mongodb.net/?retryWrites=true&w=majority`;

const ClientTheDP = new MongoClient(uri_thedp);
const Client34St = new MongoClient(uri_34st);
const ClientUTB = new MongoClient(uri_utb);

export default async (db: string, fn: (a: Collection<Document>) => void) => {
  let client: MongoClient;
  if (db === 'thedp') client = ClientTheDP;
  else if (db === '34st') client = Client34St;
  else if (db === 'utb') client = ClientUTB;
  else {
    throw new Error('INVALID DB NAME. Must be (thedp, 34st, utb)');
  }

  try {
    const database = client.db('Cluster');
    const articles = database.collection('articles');
    await fn(articles);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
