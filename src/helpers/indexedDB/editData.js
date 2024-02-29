import { db } from "../../models/db";

export const updateFormDataHauling = async (data) => {
    try {
      // Open a transaction and get the object store
      const transaction = db.formdatahauling.update(data.id, data);
      console.log(transaction)
 
    } catch (error) {
      console.log(error);
    }
  };