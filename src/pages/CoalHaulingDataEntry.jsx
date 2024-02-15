import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import InputHauling from "../components/Hauling/InputHauling";
import CardDataHauling from "../components/Hauling/CardDataHauling";
import TableHauling from "../components/Hauling/TableHauling";
import Test from "../components/Hauling/test";
import Transaksi from "../services/inputCoalHauling";

export default function CoalHaulingDataEntry() {

  const [dataEdit, setDataEdit] = useState();

  const handleEdit = async (id) => {
    // console.log(id.label);
    let data = await Transaksi.getEditData(id.label);
    console.log(data.data);
    setDataEdit(data.data[0]);
  }
  
  

  return (
    <>
      <Title title="Entry Data Hauling" />
        <div className="row">
          <div className="col-7">
            <InputHauling dataEdit={dataEdit} />
          </div>
          <div className="col-5">
            <CardDataHauling />
          </div>
          <div className="col-12">
            <TableHauling handleEdit={handleEdit} />
            {/* <Test/> */}
          </div>
        </div>
    </>
  );
}
