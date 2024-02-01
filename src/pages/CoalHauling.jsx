import React from "react";
import Title from "../components/Title";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Field, makeStyles, shorthands } from "@fluentui/react-components";
import { Radio, RadioGroup } from "@fluentui/react-components";
import { Select, useId, Card } from "@fluentui/react-components";
import InputHauling from "../components/Hauling/InputHauling";
import CardDataHauling from "../components/Hauling/CardDataHauling";
import TableHauling from "../components/Hauling/TableHauling";
import { Selectable } from "../components/Hauling/Test";

const useStyles = makeStyles({
  card: {
    width: "auto",
    maxWidth: "100%",
  },
  control: {
    maxWidth: "300px",
  },
});

const DataNoUnit = [
  {
    NoUnit: "HMP2661",
    NoUnit1: "HMP4225",
    NoUnit2: "HMP2661",
  },
];

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
