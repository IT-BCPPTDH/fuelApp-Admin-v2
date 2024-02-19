import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Button } from "@fluentui/react-components";
import { Add24Filled } from "@fluentui/react-icons";
import Title from "../components/Title";
import TableCoalHauling from "../components/Hauling/TableCoalHauling";

const useStyles = makeStyles({
  wrapper: {
    columnGap: "15px",
    display: "flex",
    marginTop: "20px",
  },
});

export default function CoalHauling() {
  const styles = useStyles();
  return (
    <>
      <Title title="Coal Hauling" />
      <div className="row">
        <div className="col-12">
          <div className={styles.wrapper}>
            <Link to="/coalhauling-dataentry">
              <Button icon={<Add24Filled />}>New Create</Button>
            </Link>
          </div>
        </div>
        <div className="col-12">
          <TableCoalHauling />
        </div>
      </div>
    </>
  );
}
