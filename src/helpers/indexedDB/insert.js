import { db } from "../../models/db";

export const insertActivity = async (data) => {
  try {
    await db.activity.bulkAdd(data);
  } catch (error) {
    console.error(error);
    return false
  }
}

export const insertOperator = async (data) => {
  try {
    await db.operator.bulkAdd(data);
  } catch (error) {
    console.error(error);
    return false
  }
}

export const insertUnit = async (data) => {
  try {
    await db.unit.bulkAdd(data);
  } catch (error) {
    console.error(error);
    return false
  }
}

export const insertFormDataHauling = async (data) => {
  try {
    return await db.formdatahauling.add(data);
  } catch (error) {
    console.log(error);
    return false
  }
}

export const insertTimeEntry = async (data) => {
  try {
    return await db.timeEntries.add(data)
  } catch (error) {
    console.log(error)
    return false
  }
}

export const insertTimeEntryDraft = async (data) => {
  try {
    console.log(data)
    return await db.timeEntriesDraft.add(data)
  } catch (error) {
    console.log(error)
    return false
  }
}