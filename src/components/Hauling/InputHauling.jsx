import React from "react";
import "./CoalHauling.css";
import {
  makeStyles,
  useId,
  Button,
  CardHeader,
} from "@fluentui/react-components";
import FormComponent from "../FormComponent";

const useStyles = makeStyles({
  card: {
    width: "930px",
    maxWidth: "100%",
    height: "485px",
  },
  control: {
    marginTop: "200px",
    backgroundColor: "#f5f5f5",
  },
});

const InputHauling = () => {
  const comp = [
    {
      inputId: useId("dateform"),
      grid: "col-4",
      label: "Tanggal",
      value: "",
      type: "DatePicker",
    },
    {
      inputId: useId("shift"),
      grid: "col-4",
      label: "Shift",
      value: "",
      type: "RadioButton",
      options: ["Day", "Night"],
    },
    {
      inputId: useId(""),
      grid: "col-4",
      label: "",
      value: "",
      type: "",
    },
    {
      inputId: useId("nounit"),
      grid: "col-4",
      label: "No Unit",
      value: "",
      type: "Combobox",
      options: ["HMP6618", "HMP1182"],
    },
    {
      inputId: useId("operator"),
      grid: "col-4",
      label: "Operator",
      value: "",
      type: "Combobox",
      options: ["AT5166 - Maulana Putra", "AB4426 - Setiyo Baskoro"],
    },
    {
      inputId: useId("loader"),
      grid: "col-4",
      label: "Loader",
      value: "",
      type: "Combobox",
      options: ["EXA1772", "EXA1167"],
    },
    {
      inputId: useId("tonnace"),
      grid: "col-4",
      label: "Tonnace",
      value: "",
      type: "Input",
    },
    {
      inputId: useId("seam"),
      grid: "col-4",
      label: "Seam",
      value: "",
      type: "Combobox",
      options: ["A", "B", "BC"],
    },
    {
      inputId: useId("dummpingpoint"),
      grid: "col-4",
      label: "Dummping Point",
      value: "",
      type: "Combobox",
      options: ["A", "B", "BC"],
    },
    {
      inputId: useId("rom"),
      grid: "col-4",
      label: "Rom",
      value: "",
      type: "Input",
    },
    {
      inputId: useId("inrom"),
      grid: "col-4",
      label: "In Rom",
      value: "",
      type: "Input",
    },
    {
      inputId: useId("outrom"),
      grid: "col-4",
      label: "Out Rom",
      value: "",
      type: "Input",
    },
  ];

  const styles = useStyles();
  const selectId = useId();

  return (
    <>
      <div className="form-wrapper wrapper" style={{marginBottom: '0', paddingTop: '3em'}}>
        <div className="input-base">
          <FormComponent components={comp} className={styles.control} />
        </div>
        <div className="btn-wrapper">
          <Button className="btn-simpan">Simpan</Button>
          <Button className="btn-simpan">
            Reset
          </Button>
        </div>
      </div>
    </>
  );
};

export default InputHauling;
