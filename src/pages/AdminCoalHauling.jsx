import React from "react";
import Title from "../components/Title";
import InputUnit from "../components/AdminCoalHauling/InputUnit";
import TableInputUnit from "../components/AdminCoalHauling/TableInputUnit";
import InputOperator from "../components/AdminCoalHauling/InputOperator";


const AdminCoalHauling = () => {
  return (
    <>
      <Title title="Master Data" />
      <div className="row">
        <div className="col-10">
          <InputOperator />
        </div>
        <div className="col-10">
          <TableInputUnit />
        </div>
      </div>
    </>
  );
};

export default AdminCoalHauling;
