import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export default function getDB() {
  const adapter = new FileSync('db.json');
  const db = lowdb(adapter);
  db.defaults({ instagram: [] }).write();
  return db;
}
