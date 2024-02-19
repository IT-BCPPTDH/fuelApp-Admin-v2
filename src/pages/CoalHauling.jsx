import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Button } from "@fluentui/react-components";
import { Add24Filled } from "@fluentui/react-icons";
import Title from "../components/Title";
import TableCoalHauling from "../components/Hauling/TableCoalHauling";
import FormComponent from "../components/FormComponent";

const useStyles = makeStyles({
  wrapper: {
    columnGap: "15px",
    display: "flex",
    marginTop: "20px",
  },
});

export default function CoalHauling() {
  const styles = useStyles();
  const currentDate = new Date();

  const tgl = [
    {
      name: "tanggal",
      grid: "col-12",
      value: "",
      readOnly: false,
      disabled: false,
      type: "DatePicker",
    },
  ];

  return (
    <>
      <Title title="Coal Hauling" />
      <div className="row">
        <div className="col-12">
          <div className={styles.wrapper}>
            <Link to="/coalhauling-dataentry">
              <Button icon={<Add24Filled />}>Create New</Button>
            </Link>
            <FormComponent components={tgl} />
          </div>
        </div>

        <div className="col-12">
          <TableCoalHauling />
        </div>
      </div>
    </>
  );
}
