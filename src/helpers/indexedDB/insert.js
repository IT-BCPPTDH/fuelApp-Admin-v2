import { db } from "../../../models/db";

export const insertActivity = (data) =>{
    data.map(async (v) => {
        try {
          await db.activity.add({
            uuid:v.id,
            activityname: v.activityname,
            delaydescription: v.delaydescription,
            kode: v.kode,
          });
        } catch (error) {
          console.error(error);
        }
      });
}

export const insertOperator = (data) =>{
    data.map(async (v) => {
        try {
          await db.operator.add({
            uuid:v.id,
            jde:v.jde,
            fullname:v.fullname,
            position:v.position
          });
        } catch (error) {
          console.error(error);
        }
      });
}