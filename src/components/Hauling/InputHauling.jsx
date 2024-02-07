import React, { useState, useMemo } from "react";
import "./CoalHauling.css";
import {
  useId,
  Button,
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
} from "@fluentui/react-components";
import FormComponent from "../FormComponent";


const shiftOptions = ["Day", "Night"];
const unitOptions = ["EXA526", "EXA726"];
const loaderOptions = ["HWL1038", "HWL1040"];
const seamOptions = ["A", "B", "C"];
const dummpingpointOptions = ["A", "AB", "C"];

const InputHauling = () => {
  const currentDate = new Date();
  const [formData, setFormData] = useState({
    tanggal: currentDate,
    shift: "",
    unitNo: "",
    operator: "",
    loader: "",
    tonnage: "",
    seam: "",
    dummpingpoint: "",
    rom: "",
    inrom: "",
    outrom: "",
  });

  const comp = useMemo (() => [
    {
      name: "tanggal",
      grid: "col-4",
      label: "Tanggal",
      value: formData.tanggal,
      readOnly: false,
      disabled: false,
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
      
      grid: "col-4",
     
    },
    {
      name: "unitNo",
      grid: "col-4",
      label: "No Unit",
      value: formData.unitNo,
      readOnly: false,
      disabled: false,
      type: "Combobox",
      options: unitOptions,
    },
    {
      name: "operator",
      grid: "col-4",
      label: "Operator",
      readOnly: false,
      disabled: false,
      value: formData.operator,
      type: "Input",
    },
    {
      name: "loader",
      grid: "col-4",
      label: "Loader",
      value: formData.loader,
      readOnly: false,
      disabled: false,
      type: "Combobox",
      options: loaderOptions,
    },
    {
      name: "tonnage",
      grid: "col-4",
      label: "Tonnage",
      readOnly: false,
      disabled: false,
      value: formData.tonnage,
      type: "Input",
    },
    {
      name: "seam",
      grid: "col-4",
      label: "Seam",
      readOnly: false,
      disabled: false,
      value: formData.seam,
      type: "Combobox",
      options: seamOptions,
    },
    {
      name: "dummpingpoint",
      grid: "col-4",
      label: "Dummping Point",
      readOnly: false,
      disabled: false,
      value: formData.dummpingpoint,
      type: "Combobox",
      options: dummpingpointOptions,
    },
    {
      name: "rom",
      grid: "col-4",
      label: "Rom",
      readOnly: false,
      disabled: false,
      value: formData.rom,
      type: "Input",
    },
    {
      name: "inrom",
      grid: "col-4",
      label: "In Rom",
      readOnly: false,
      disabled: false,
      value: formData.inrom,
      type: "Input",
    },
    {
      name: "outrom",
      grid: "col-4",
      label: "Out Rom",
      readOnly: false,
      disabled: false,
      value: formData.outrom,
      type: "Input",
    },
  ], [formData]);


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
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(name, value);
    
    
  
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
