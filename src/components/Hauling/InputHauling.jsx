import React from "react";
import "./CoalHauling.css";
import {
  makeStyles,
  useId,
  Button,
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
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
      name: "tanggal",
      grid: "col-4",
      label: "Tanggal",
      value: "",
      type: "DatePicker",
    },
    {
      name: "shift",
      grid: "col-4",
      label: "Shift",
      value: "",
      type: "RadioButton",
      options: ["Day", "Night"],
    },
    {
      name: useId(""),
      grid: "col-4",
      label: "",
      value: "",
      type: "",
    },
    {
      name: "nounit",
      grid: "col-4",
      label: "No Unit",
      value: "",
      type: "Combobox",
      options: ["HMP6618", "HMP1182"],
    },
    {
      name: "operator",
      grid: "col-4",
      label: "Operator",
      value: "",
      type: "Input",
    },
    {
      name: "loader",
      grid: "col-4",
      label: "Loader",
      value: "",
      type: "Combobox",
      options: ["EXA1772", "EXA1167"],
    },
    {
      name:"tonnace",
      grid: "col-4",
      label: "Tonnace",
      value: "",
      type: "Input",
    },
    {
      name: "seam",
      grid: "col-4",
      label: "Seam",
      value: "",
      type: "Combobox",
      options: ["A", "B", "BC"],
    },
    {
      name: "dummpingpoint",
      grid: "col-4",
      label: "Dummping Point",
      value: "",
      type: "Combobox",
      options: ["A", "B", "BC"],
    },
    {
      name: "rom",
      grid: "col-4",
      label: "Rom",
      value: "",
      type: "Input",
    },
    {
      name: "inrom",
      grid: "col-4",
      label: "In Rom",
      value: "",
      type: "Input",
    },
    {
      name: "outrom",
      grid: "col-4",
      label: "Out Rom",
      value: "",
      type: "Input",
    },
  ];

  const styles = useStyles();
  const selectId = useId();

  const toasterId = useId("toaster");
  const toastId = useId("example");
  const [unmounted, setUnmounted] = React.useState(true);
  const { dispatchToast, dismissToast } = useToastController(toasterId);

  const notify = () => {
    dispatchToast(
      <Toast>
        <ToastTitle>Data Berhasil Disimpan</ToastTitle>
      </Toast>,
      {
        toastId,
        intent: "success",
        onStatusChange: (e, { status }) => setUnmounted(status === "unmounted"),
      }
    );
    setUnmounted(false);
  };
  const dismiss = () => dismissToast(toastId);

  return (
    <>
      <div
        className="form-wrapper wrapper"
        style={{ marginBottom: "0", paddingTop: "3em" }}
      >
        <div className="input-base">
          <FormComponent components={comp} className={styles.control} />
        </div>
        <div className="btn-wrapper">
          <Button onClick={unmounted ? notify : dismiss}>
            {unmounted ? "Simpan" : "Simpan"}
          </Button>
          <Button className="btn-simpan">Reset</Button>
          <Toaster toasterId={toasterId} />
        </div>
      </div>
    </>
  );
};

export default InputHauling;
