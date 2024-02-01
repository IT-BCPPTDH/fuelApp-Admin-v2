import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(2).stores({
  activity:'++id,uuid,activityname,delaydescription,kode',
  operator:'++id,uuid,jde,fullname,position'
});
