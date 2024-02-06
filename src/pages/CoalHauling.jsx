import React from "react";
import Title from "../components/Title";
import { Field, makeStyles, shorthands } from "@fluentui/react-components";
import { Radio, RadioGroup } from "@fluentui/react-components";
import { Select, useId, Card } from "@fluentui/react-components";
import InputHauling from "../components/Hauling/InputHauling";
import CardDataHauling from "../components/Hauling/CardDataHauling";
import TableHauling from "../components/Hauling/TableHauling";



const useStyles = makeStyles({
  card: {
    width: "auto",
    maxWidth: "100%",
  },
  control: {
    maxWidth: "300px",
  },
});


export default function CoalHauling() {
  const styles = useStyles();
  const selectId = useId();
  return (
    <>
      <Title title="Entry Data Hauling" />
        <div className="row">
          <div className="col-7">
            <InputHauling />
          </div>
          <div className="col-5">
            <CardDataHauling />
          </div>
          <div className="col-12">
            <TableHauling />
          </div>
        </div>
    </>
  );
}
