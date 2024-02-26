import React from "react";
import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import TableDetailHauling from "../components/Hauling/TableDetailHauling";

const DetailHauling = () => {
  return (
    <>
      <HeaderPageForm title={`Detail Tanggal 12/01/2024`} />
      <div className="row">
        <div className="col-12">
            <TableDetailHauling/>
        </div>
      </div>
    </>
  );
};

export default DetailHauling;
