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
import Transaksi from "../../services/inputCoalHauling";

const shiftOptions = ["Day", "Night"];
const unitOptions = ["EXA526", "EXA726"];
const loaderOptions = ["HWL1038", "HWL1040"];
const seamOptions = ["B Hs", "C2", "BB"];
const dumpingpointOptions = [
  "MAIN COAL FACILITY ( HOPPER)",
  "STOCK PILE / OVERFLOW ( ROM MF)",
  "STOCK PILE / EARLY COAL FACILITY (ROM ECF)",
  "MIDLE STOCK PILE", "SEKURAU"];
const pitOptions = ["A", "C", "D"];

const InputHauling = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const currentDate = new Date();
  const [formData, setFormData] = useState({
    tanggal: currentDate,
    shift: "",
    unitNo: "",
    operator: "",
    loader: "",
    tonnage: "",
    seam: "",
    dumpingpoint: "",
    rom: "",
    inrom: "",
    outrom: "",
    pit: "",
  });

  const comp = useMemo(
    () => [
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
        name: "pit",
        grid: "col-4",
        label: "Pit",
        value: formData.pit,
        readOnly: false,
        disabled: false,
        type: "Combobox",
        options: pitOptions,
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
        name: "dumpingpoint",
        grid: "col-4",
        label: "Dump Point",
        readOnly: false,
        disabled: false,
        value: formData.dumpingpoint,
        type: "Combobox",
        options: dumpingpointOptions,
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
        type: "TimePicker",
      },
      {
        name: "outrom",
        grid: "col-4",
        label: "Out Rom",
        readOnly: false,
        disabled: false,
        value: formData.outrom,
        type: "TimePicker",
      },
    ],
    [formData]
  );

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
    if (name === "inrom" || name === "outrom") {
      const hours = value.selectedTime.getHours();
      const minutes = value.selectedTime.getMinutes();
      const second = value.selectedTime.getSeconds();

      const addLeadingZero = (num) => (num < 10 ? `0${num}` : num);

      // Format waktu menjadi string "HH:mm:ss"
      const formattedTime = `${addLeadingZero(hours)}:${addLeadingZero(
        minutes
      )}:${addLeadingZero(second)}`;

      console.log(formattedTime); // Output: "09:00:00"
      console.log(hours, minutes, second);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formattedTime,
      }));
    } else if (name == "tonnage" || name == "dumpingpoint") {
      // const converted = Number(value);
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const isValid = Object.values(formData).every((val) => val !== "");
    setIsFormValid(isValid);
    console.log(1, name, value);
  };

  const handleSubmit = async () => {
    // console.log(formData);
    // if (isFormValid) {
    //   console.log(formData);
    // } else {
    //   console.log("Form is not valid. Please fill in all fields.");
    // }
    let data = {
      ...formData,
    };
    console.log(data);

    let datainsert = await Transaksi.postCreateTransaction(data);
    console.log(datainsert);
  };

  return (
    <>
      <div
        className="form-wrapper wrapper"
        style={{ marginBottom: "0", paddingTop: "3em" }}
      >
        <div className="input-base">
          <FormComponent components={comp} handleChange={handleChange} />
        </div>
        <div className="btn-wrapper">
          {/* <Button onClick={unmounted ? notify : dismiss}  handleSubmit={handleSubmit} >
            {unmounted ? "Simpan" : "Simpan"}
          </Button> */}
          <Button className="btn-simpan" onClick={handleSubmit}>
            Simpan
          </Button>
          <Button className="btn-simpan">Reset</Button>
          <Toaster toasterId={toasterId} />
        </div>
      </div>
    </>
  );
};

export default InputHauling;
