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
    const timeEntries = await db.timeEntries
      .where('unitNo')
      .equals(unitNo)
      .first();

    return timeEntries;
  } catch (error) {
    console.log(error)
  }
}

export const getTimeEntryByformTitle = async (formTitle) => {
  try {
    const timeEntries = await db.timeEntries
      .where('formTitle')
      .equals(formTitle)
      .toArray();

    return timeEntries;
  } catch (error) {
    console.log(error)
  }
}