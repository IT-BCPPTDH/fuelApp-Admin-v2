import { db } from "../../models/db";

export const deleteFormDataHauling = async () => {
  try {
    await db.formdatahauling.clear();
    return true
  } catch (error) {
    console.error('Gagal menghapus data dari IndexedDB', error);
    return false
  }
};

export const deleteByIdDataHauling = async (dataId) => {
  try {
    await db.formdatahauling.delete(dataId);
    return true
  } catch (error) {
    console.error('Gagal menghapus data dari IndexedDB', error);
    return false
  }
};

export const deleteTimeEntries = async (dataId) => {
  try {
    await db.timeEntries.delete(dataId)
    return true
  } catch (error) {
    console.log(error)
  }
}

export const deleteTimeEntriesDRAFT = async (dataId) => {
  try {
    await db.timeEntriesDraft.delete(dataId)
    return true
  } catch (error) {
    console.log(error)
  }
}

export const deleteCoalHaulingDRAFT = async (dataId) => {
  try {
    await db.coalHaulingMHA.delete(dataId)
    return true
  } catch (error) {
    console.log(error)
  }
}

export const deleteAllCoalHaulingDraft = async () => {
  try {
    await db.coalHaulingMHA.clear();
    return true
  } catch (error) {
    console.error('Gagal menghapus data dari IndexedDB', error);
    return false
  }
};