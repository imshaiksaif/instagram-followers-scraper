import express from 'express';
import cors from 'cors';

import { go } from './lib/scraper';
import getDB from './lib/db';
import './lib/cron';
import { uniqueCount } from './lib/utils';
import aggregate from './lib/aggregate';

const app = express();
const db = getDB();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.get('/user/:username', async (req, res) => {
  console.log('hera', req.params.username);
  const { username } = req.params;
  const currentFollowers = await go(username);
  res.status(200).json({ instaFollowers: currentFollowers });
});

app.get('/scraped-data', async (req, res) => {
  const data = await db.get('instagram');
  res.status(200).json({ instagram: data });
});

app.get('/data', async (req, res) => {
  // get the scrape data
  const data = await db.get('instagram').value();
  // filter for only unique values
  const uniqueData = uniqueCount(data);
  // respond with json
  res.status(200).json({ instagram: uniqueData });
});

app.get('/aggregate', async (req, res) => {
  // get the scrape data
  const data = await db.get('instagram').value();
  // filter for only unique values
  const uniqueData = uniqueCount(data);
  // Need to aggregate this values
  const dataAggregated = aggregate(uniqueData);
  // respond with json
  res.status(200).json({ instagram: dataAggregated });
});

app.listen(4444, () => {
  console.log('Server running at PORT 4444');
});
