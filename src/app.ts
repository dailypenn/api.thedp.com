import express, { Request, Response } from 'express';
import run from './db';
import { Collection, Document } from 'mongodb';

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

app.get('/:db/articles/recent', (request: Request) => {
  if (!request.query.count) {
    request.query.count = '5';
  }
  const count = Number(request.query.count);

  run(request.params.db, async (articles: Collection<Document>) => {
    const article = await articles
      .find()
      // .sort({})
      .limit(count)
      .next();

    console.log(article);
  });
});
