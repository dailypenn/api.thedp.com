import express, { Request, Response, NextFunction } from "express";
import db from "./db";
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`api.thedp.com is running on port ${port}.`);

  db.run(
    db.Client34St,
    /*async (client: MongoClient) => {
      const articles = client.db().collection("articles");

      const article = await articles.findOne({ headline: "SP2 professor elected president of nonprofit research organization " });

      console.log(article)
    }*/
  );
});
