import { db } from "../../models/db";

export const getAllDataTable = async () => {
    try {
        return await db.coalHaulingTable.toArray()
    } catch (error) {
        console.log(error)
    }
}

export const insertAllDataTable = async (data) => {
    try {
        await db.coalHaulingTable.bulkAdd(data);
    } catch (error) {
        console.error(error);
        return false
    }
}

export const deleteAllDataTable = async () => {
    try {
        await db.coalHaulingTable.clear();
        return true
    } catch (error) {
        console.error('Gagal menghapus data dari IndexedDB', error);
        return false
    }
};