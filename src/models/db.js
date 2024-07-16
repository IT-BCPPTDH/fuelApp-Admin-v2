import Dexie from 'dexie';

export const db = new Dexie('myDatabase');

db.version(17).stores({
  activity: '++id,activityname,delaydescription,kode',
});
