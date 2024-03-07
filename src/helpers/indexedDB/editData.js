import { db } from "../../models/db";

export const updateFormDataHauling = async (dataId, data) => {
  try {
    return await db.formdatahauling.update(dataId, data)
  } catch (error) {
    console.log(error);
    return false
  }
};

export const updateTimeEntry = async (dataId, data) => {
  try {
      return await db.timeEntries.update(dataId, data)
  } catch (error) {
    console.error(error)
    return false
  }
}