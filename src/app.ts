import express, { Request, Response, NextFunction } from "express";
import run from "./db";
import { Collection, Document } from "mongodb";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`api.thedp.com is running on port ${port}.`);
});

app.get("/:db/articles/recent", (request, response) => {
  if(!request.query.count) {
    request.query.count = "5";
  }
  const count = Number(request.query.count);

  run(
    request.params.db,
    async (articles: Collection<Document>) => {
      const article = await
        articles
          .find()
          // .sort({})
          .limit(count)
          .next();
  
      console.log(article);
    }
  );



})
