import axios from 'axios';
import getDB from './db';

const db = getDB();

async function getInstagramFollowers(username) {
  const { data } = await axios.get(
    `https://www.instagram.com/${username}/?__a=1`
  );
  const followers = data.graphql.user.edge_followed_by.count;
  return followers;
}

async function go(username = 'imshaiksaif') {
  const instaFollowers = await getInstagramFollowers(username);
  return instaFollowers;
}

async function runCron() {
  const currentFollowers = await go();

  db.get('instagram')
    .push({
      date: Date.now(),
      count: currentFollowers,
    })
    .write();
}

export { getInstagramFollowers, go, runCron };
