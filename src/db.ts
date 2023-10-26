import { Db, MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const USERNAME = "luke";
const PASSWORD = process.env.PASSWORD;

const uri_thedp = `mongodb+srv://${USERNAME}:${PASSWORD}@dp.5aehsyo.mongodb.net/?retryWrites=true&w=majority`;
const uri_34st = `mongodb+srv://${USERNAME}:${PASSWORD}@34st.rvmlxes.mongodb.net/?retryWrites=true&w=majority`;
const uri_utb = `mongodb+srv://${USERNAME}:${PASSWORD}@utb.rjdlubs.mongodb.net/?retryWrites=true&w=majority`;

const ClientTheDP = new MongoClient(uri_thedp);
const Client34St = new MongoClient(uri_34st);
const ClientUTB = new MongoClient(uri_utb);

async function run(client: MongoClient) {
  try {
    const database = client.db();
    const articles = database.collection("articles");
    const article = await articles.find().limit(1).next();

    // const article = await articles.findOne({});

    console.log(article);

    // db_fn(client);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export default {
  ClientTheDP,
  Client34St,
  ClientUTB,
  run,
}
