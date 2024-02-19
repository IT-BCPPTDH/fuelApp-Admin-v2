import Dexie from 'dexie';

export const db = new Dexie('myDatabase');

db.version(3).stores({
  activity:'++id,activityname,delaydescription,kode',
  operator:'++id,jde,fullname,position',
  unit:'++id,unitno,type,merk,category,owner,usage'
});
