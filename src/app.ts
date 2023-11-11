import express, { Request, Response } from 'express';
import { Collection, Document } from 'mongodb';
import Article from "./models/article";
import articles from "./db";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`api.thedp.com is running on port ${port}.`);
});

app.get('/health', (_, response: Response) => {
  try {
    response.send({ status: 200, message: 'App is healthy' }).status(200);
  } catch {
    response
      .send({ status: 500, message: 'Internal server error' })
      .status(500);
  }
});

app.get("/:db/articles/recent/:count", async (req: Request, res: Response) => {
  try {
    let count = req.params["count"]
    if(count != "0") {
      const db = req.params["db"]
      const results = await (articles[db].find({}).limit(Number(count))).toArray()
      res.status(200).send(results);
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
      res.status(500).send(error.message);
  }
});

app.get("/:db/articles/all/authors", async (req: Request, res: Response) => {
  try {
    let authors:string[] = []
    if (typeof(req.query["author"]) === "string"){
      authors = [req.query["author"]]
    } else {
      authors = req.query["author"] as string[]
    }
    console.log(authors)
    let conditions = []
    for (let author of authors) {
      console.log(author)
      conditions.push({
        authors: {
          $elemMatch: {
            slug: author
          }
        }
      })
    }
    let query = {$and: conditions}
    console.log(query)
    if(query) {
      const db = req.params["db"]
      const results = await (articles[db].find(query)).toArray()
      res.status(200).send(results);
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
      res.status(500).send(error.message);
  }
});

app.get("/:db/articles/all/tags", async (req: Request, res: Response) => {
  try {
    console.log(req.query["tag"])
    let tags: string[] = req.query["tag"] as string[]
    let conditions = []
    for (let tag of tags) {
      conditions.push({
        tags: {
          $elemMatch: {
            slug: tag
          }
        }
      })
    }
    let query = {$and: conditions}
    if(query) {
      const db = req.params["db"]
      const results = await (articles[db].find(query)).toArray()
      res.status(200).send(results);
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
      res.status(500).send(error.message);
  }
});
