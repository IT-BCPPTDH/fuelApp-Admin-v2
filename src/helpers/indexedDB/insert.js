import { db } from "../../models/db";

export const insertActivity = async (data) =>{
    try {
        await db.activity.bulkAdd(data);
      } catch (error) {
        console.error(error);
      }
}

export const insertOperator = async (data) =>{
      try {
        await db.operator.bulkAdd(data);
      } catch (error) {
        console.error(error);
      }
}

export const insertUnit = async (data) =>{
  try {
    await db.unit.bulkAdd(data);
  } catch (error) {
    console.error(error);
  }
}

export const insertFormDataHauling = async (data) =>{
console.log(data);
  try {
   let a = await db.formdatahauling.add(data);
   console.log(a);
  } catch (error) {
    console.log(error);
  }
}