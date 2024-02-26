import { db } from "../../models/db";

export const getActivity = async () =>{
    try {
        const activities = await db.activity.toArray();
        return activities
      } catch (error) {
        console.error(error);
      }
}

export const getOperator = async () =>{
    try {
        const operators = await db.operator.toArray();
        return operators
      } catch (error) {
        console.error(error);
      }
}

export const getDataTableHauling = async () =>{
  try {
      const formdatahaulings = await db.formdatahauling.toArray();
      return formdatahaulings
    } catch (error) {
      console.error(error);
    }
}