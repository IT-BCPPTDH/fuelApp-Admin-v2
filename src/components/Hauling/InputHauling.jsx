import React, { useState, useEffect } from 'react';
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



const shiftOptions = ['Day', 'Night']
const unitOptions = ['EXA526', 'EXA726']
const loaderOptions = ['EXA526', 'EXA726']
const seamOptions = ['A', 'B', 'C']
const dummpingpointOptions = ['A', 'AB', 'C']

const InputHauling = () => {
  

  const [formData, setFormData] = useState({
    tanggal: '',
    shift: '',
    unitNo: '',
    operator: '',
    loader: '',
    tonnace: '',
    seam: '',
    dummpingpoint: '',
    rom:'',
    inrom:'',
    outrom:'',
  })
  const comp = [
    {
      name: "tanggal",
      grid: "col-4",
      label: "Tanggal",
      value: formData.tanggal,
      type: "DatePicker",
    },
    {
      name: "shift",
      grid: "col-4",
      label: "Shift",
      value: formData.shift,
      type: "RadioButton",
      options: shiftOptions,
    },
    {
      name: "",
      grid: "col-4",
      label: "",
      value: "",
      type: "",
    },
    {
      name: "nounit",
      grid: "col-4",
      label: "No Unit",
      value: formData.unitNo,
      type: "Combobox",
      options: unitOptions,
    },
    {
      name: "operator",
      grid: "col-4",
      label: "Operator",
      // value: "",
      type: "Input",
    },
    {
      name: "loader",
      grid: "col-4",
      label: "Loader",
      value: formData.loader,
      type: "Combobox",
      options: loaderOptions,
    },
    {
      name: "tonnace",
      grid: "col-4",
      label: "Tonnace",
      // value: formData.tonnace,
      type: "Input",
    },
    {
      name: "seam",
      grid: "col-4",
      label: "Seam",
      value: formData.seam,
      type: "Combobox",
      options: seamOptions,
    },
    {
      name: "dummpingpoint",
      grid: "col-4",
      label: "Dummping Point",
      value: formData.dummpingpoint,
      type: "Combobox",
      options: dummpingpointOptions,
    },
    {
      name: "rom",
      grid: "col-4",
      label: "Rom",
      // value: formData.rom,
      type: "Input",
    },
    {
      name: "inrom",
      grid: "col-4",
      label: "In Rom",
      // value: formData.inrom,
      type: "Input",
    },
    {
      name: "outrom",
      grid: "col-4",
      label: "Out Rom",
      // value: formData.outrom,
      type: "Input",
    },
  ];

  const styles = useStyles();
  // const selectId = useId();
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

  const handleChange = (e, v) => {
    const { name, value } = v;
    console.log(e.target.value);
  };

  return (
    <>
      <div
        className="form-wrapper wrapper"
        style={{ marginBottom: "0", paddingTop: "3em" }}
      >
        <div className="input-base">
          <FormComponent
            components={comp}
            handleChange={handleChange}
            className={styles.control}
          />
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
