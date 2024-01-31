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

const DataHauling = [
  {
    id: 1,
    Tgl: "12/01/2024",
    Shift: "Day",
    NoUnit: "",
    Operator: "",
    Loader: "",
    Tonnace: 1627,
    Seam: "A",
    DummpingPoint: "",
    Rom: 0,
    InRom: "12.00",
    OutRom: "13.00",
  },
  {
    id: 2,
    Tgl: "12/01/2024",
    Shift: "Day",
    NoUnit: "",
    Operator: "",
    Loader: "",
    Tonnace: 1627,
    Seam: "A",
    DummpingPoint: "",
    Rom: 0,
    InRom: "12.00",
    OutRom: "13.00",
  },
];

export default function CoalHauling() {
  const styles = useStyles();
  const selectId = useId();
  return (
    <>
      <Title title="Entry Data Hauling" />
      <div className={`container`}>
        <div className="row">
          <div className="col-8">
            <InputHauling />
          </div>
          <div className="col-4">
            <CardDataHauling />
            {/* <Selectable/> */}
          </div>
          <div className="col-12">
            <TableHauling />
          </div>
        </div>
      </div>
    </>
  );
}
