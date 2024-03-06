import { db } from "../../models/db";

export const updateFormDataHauling = async (dataId, data) => {
  try {
    return await db.formdatahauling.update(dataId, data)
  } catch (error) {
    console.log(error);
    return false
  }
};