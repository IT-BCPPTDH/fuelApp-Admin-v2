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
      InputId: useId("dateform"),
      grid: "col-4",
      label: "Tanggal",
      value: "",
      type: "DatePicker",
    },
    {
      InputId: useId("shift"),
      grid: "col-4",
      label: "Shift",
      value: "",
      type: "RadioButton",
      options: ["Day", "Night"],
    },
    {
      InputId: useId(""),
      grid: "col-4",
      label: "",
      value: "",
      type: "",
    },
    {
      InputId: useId("nounit"),
      grid: "col-4",
      label: "No Unit",
      value: "",
      type: "Combobox",
      options: ["HMP6618", "HMP1182"],
    },
    {
      InputId: useId("operator"),
      grid: "col-4",
      label: "Operator",
      value: "",
      type: "Combobox",
      options: ["AT5166 - Maulana Putra", "AB4426 - Setiyo Baskoro"],
    },
    {
      InputId: useId("loader"),
      grid: "col-4",
      label: "Loader",
      value: "",
      type: "Combobox",
      options: ["EXA1772", "EXA1167"],
    },
    {
      InputId: useId("tonnace"),
      grid: "col-4",
      label: "Tonnace",
      value: "",
      type: "Input",
    },
    {
      InputId: useId("seam"),
      grid: "col-4",
      label: "Seam",
      value: "",
      type: "Combobox",
      options: ["A", "B", "BC"],
    },
    {
      InputId: useId("dummpingpoint"),
      grid: "col-4",
      label: "Dummping Point",
      value: "",
      type: "Combobox",
      options: ["A", "B", "BC"],
    },
    {
      InputId: useId("rom"),
      grid: "col-4",
      label: "Rom",
      value: "",
      type: "Input",
    },
    {
      InputId: useId("inrom"),
      grid: "col-4",
      label: "In Rom",
      value: "",
      type: "Input",
    },
    {
      InputId: useId("outrom"),
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
      <p>
        <small>Insert Box</small>
      </p>
      {/* <div className="form-wrapper">
        <div className={styles.card}>
          <FormComponent components={comp} className={styles.control} />
          <Button className={styles.button}>Simpan</Button>
        </div>
      </div> */}
      <div className="form-wrapper wrapper">
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
