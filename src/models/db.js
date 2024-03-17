import Dexie from 'dexie';

export const db = new Dexie('myDatabase');

db.version(11).stores({
  activity: '++id,activityname,delaydescription,kode',
  operator: '++id,jde,fullname,position',
  unit: '++id,unitno,type,merk,category,owner,usage',
  formdatahauling: '++id,tanggal,shift,unitno,operator,loader,tonnage,seam,dumpingpoint,rom,inrom,outrom,pit',
  timeEntries: "++id, site, stafEntry, tanggal, shift, unitNo, hmAwal, hmAkhir, typeUnit, formTitle, formID, timeEntries, totalDuration",
  timeEntriesDraft: "++id, site, stafEntry, tanggal, shift, unitNo, hmAwal, hmAkhir, typeUnit, formTitle, formID, timeEntries, total"
});
