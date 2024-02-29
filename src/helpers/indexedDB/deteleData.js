import { db } from "../../models/db";


export const deleteFormDataHauling = async (data) => {
    try {
      let db = await openDB(id.label, 1);
      console.log(11,db)
      console.log('Data berhasil dihapus dari IndexedDB');
    } catch (error) {
      console.error('Gagal menghapus data dari IndexedDB', error);
    }
  };
  