import { db } from "../../models/db";

export const deleteFormDataHauling = async (dataId) => {
  try {
    await db.formdatahauling.delete(dataId);
    return true
  } catch (error) {
    console.error('Gagal menghapus data dari IndexedDB', error);
    return false
  }
};
