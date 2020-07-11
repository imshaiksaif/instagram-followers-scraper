import cron from 'node-cron';

import { runCron } from './scraper';

cron.schedule('0 23 * * *', () => {
  runCron();
  console.log('Running Cron Job');
});
