import { db } from "../../models/db";

export const getActivity = async () => {
  try {
    const activities = await db.activity.toArray();
    return activities
  } catch (error) {
    console.error(error);
  }
}

export const getOperator = async () => {
  try {
    const operators = await db.operator.toArray();
    return operators
  } catch (error) {
    console.error(error);
  }
}

export const getOperatorNameById = async (operatorId) => {
  try {
    return await db.operator.get({
      jde: operatorId
    })
  } catch (error) {
    console.error(error)
  }
}

export const getUnitDataByNo = async (unitNo) => {
  try {
    return await db.unit.get({
      unitno: unitNo
    });

  } catch (error) {
    console.error(error)
  }
}

export const getUnitByCategory = async (category) => {
  try {
      const unit = await db.unit.where("category").equals(category).toArray()
      return unit ?? []
  } catch (error) {
    console.error(error)
  }
}

export const getDataTableHauling = async () => {
  try {
    const formdatahaulings = await db.formdatahauling.toArray();
    return formdatahaulings
  } catch (error) {
    console.error(error);
  }
}

export const getTimeEntryByUnit = async (unitNo) => {
  try {
    const timeEntries = await db.timeEntries.where('unitNo').equals(unitNo).toArray()
    return timeEntries;
  } catch (error) {
    console.error(error)
  }
}

export const getTimeEntryDraftByUnit = async (unitNo) => {
  try {
    const timeEntries = await db.timeEntriesDraft.where('unitNo').equals(unitNo).toArray()
    return timeEntries;
  } catch (error) {
    console.error(error)
  }
}

export const getTimeEntryByformTitle = async (formTitle) => {
  try {
    const timeEntries = await db.timeEntries.where('formTitle').equals(formTitle).toArray()
    return timeEntries;
  } catch (error) {
    console.error(error)
  }
}

export const getTimeEntryDraftByformTitle = async (formTitle) => {
  try {
    const timeEntries = await db.timeEntriesDraft.where('formTitle').equals(formTitle).toArray()
    return timeEntries;
  } catch (error) {
    console.error(error)
  }
}

export const getTimeEntryDetailById = async (itemId) => {
  try {
    return await db.timeEntries.get(itemId)
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getTimeEntryDraftDetailById = async (itemId) => {
  try {
    return await db.timeEntriesDraft.get(itemId)
  } catch (error) {
    console.error(error)
    return false
  }
}

