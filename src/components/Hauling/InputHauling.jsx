import React, { useState, useMemo, useEffect, useCallback } from "react";
import "./CoalHauling.css";
import {
  useId,
  Button,
  MessageBar,
  MessageBarTitle,
  MessageBarBody,
  Link,
  makeStyles,
} from "@fluentui/react-components";
import FormComponent from "../FormComponent";
import Transaksi from "../../services/inputCoalHauling";
import { Save24Regular, ArrowReset24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  messageContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
  },
});

const shiftOptions = ["Day", "Night"];
const unitOptions = ["EXA526", "EXA726"];
// const tonnageOptions = [68, 110, 140, 160, 135,];
const loaderOptions = [
  "HWL1038",
  "HWL1039",
  "HWL1040",
  "HWL5043",
  "HEX1472",
  "HEX1312",
  "HEX1473",
  "HEX1248",
  "HEX1320",
  "HEX1473",
  "HWL5041",
];

const dumpingpointOptions = [
  "MAIN COAL FACILITY ( HOPPER)",
  "STOCK PILE / OVERFLOW ( ROM MF)",
  "STOCK PILE / EARLY COAL FACILITY (ROM ECF)",
  "MIDLE STOCK PILE",
  "SEKURAU",
];
const pitOptions = [
  "PIT A NORTH 1",
  "PIT A NORTH 2",
  "PIT A SOUTH 1",
  "PIT A SOUTH 2",
  "PIT B01",
  "PIT B02",
];

const seamOptionsData = {
  "PIT A NORTH 1": ["C2", "B Hs", "BB", "ARB", "D", "A", "C"],
  "PIT A NORTH 2": ["C2", "B Hs", "BB", "ARB", "D", "A", "C"],
  "PIT A SOUTH 1": [
    "ARB",
    "B Hs",
    "B AMM",
    "D",
    "C",
    "FF",
    "C2",
    "CC",
    "D MTN",
  ],
  "PIT A SOUTH 2": [
    "ARB",
    "B Hs",
    "B AMM",
    "D",
    "C",
    "FF",
    "C2",
    "CC",
    "D MTN",
  ],
  "PIT B01": [
    "A PAMA",
    "C PAMA",
    "D",
    "BM PAMA",
    "AHS PAMA",
    "B AAM",
    "DE AAM",
    "E1",
    "A2",
    "C DH",
    "D AMM",
    "A AMM",
    "B SEAM",
    "E 1 MTN",
    "DE1 AMM",
    "D MTN",
  ],
  "PIT B02": [
    "A PAMA",
    "C PAMA",
    "D",
    "BM PAMA",
    "AHS PAMA",
    "B AAM",
    "DE AAM",
    "E1",
    "A2",
    "C DH",
    "D AMM",
    "A AMM",
    "B SEAM",
    "E 1 MTN",
    "DE1 AMM",
    "D MTN",
  ],
};

const InputHauling = ({ dataEdit , postData, setPostData, tid}) => {
  const classes = useStyles();
  const [message, setMessage] = React.useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [seamOptions, setSeamOptions] = useState([]);
  const [formData, setFormData] = useState({});
  // const [shift, setShift] = useState([]);
  

  
  const determineShift = () => {
    const currentHour = new Date().getHours();
  
    // Menentukan shift berdasarkan jam
    const shift = currentHour >= 6 && currentHour < 18 ? 'Day' : 'Night';
  
    return shift;
  };

  useEffect(() => {

    setFormData({
      // id:dataEdit?.id?dataEdit?.id:'',
      tanggal: dataEdit?.tanggal ?? new Date(),
      shift: dataEdit?.shift ?? determineShift(),
      unitNo: dataEdit?.unitNo ?? '',
      operator: dataEdit?.operator ?? '',
      loader: dataEdit?.loader ?? '',
      tonnage: dataEdit?.tonnage ?? '',
      seam: dataEdit?.seam ?? '',
      dumpingpoint: dataEdit?.dumpingpoint ?? '',
      rom: dataEdit?.rom ?? '',
      inrom: dataEdit?.inrom ?? '',
      outrom: dataEdit?.outrom ?? '',
      pit: dataEdit?.pit ?? '',
    });
    
  }, [dataEdit]);

  const handleChange = useCallback((e, v) => {
    const { name, value } = v;

    if (name === "inrom" || name === "outrom") {
      const hours = value.selectedTime.getHours();
      const minutes = value.selectedTime.getMinutes();
      const second = value.selectedTime.getSeconds();

      const addLeadingZero = (num) => (num < 10 ? `0${num}` : num);

      const formattedTime = `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(second)}`;

      console.log(formattedTime);
      console.log(hours, minutes, second);

      if (name === "inrom" && formattedTime > formData.outrom) {
        alert("inrom tidak boleh lebih besar dari outrom");
      } else if (name === "outrom" && formData.inrom > formattedTime) {
        alert("outrom tidak boleh lebih kecil dari inrom");
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formattedTime,
      }));


    } else {

      if (name === "pit") {
        let a = pitOptions?.find((v) => v === value);
        setSeamOptions(seamOptionsData[a]);
      }
      
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  
    const isValid = Object.values(formData).every((val) => val !== "");
    setIsFormValid(isValid);

  }, [formData, setIsFormValid, setFormData, setSeamOptions]);


  const handleSubmit = async () => {
    try {
      const requiredFields = ["tanggal", "shift", "unitNo", "operator", "loader", "tonnage", "seam", "dumpingpoint", "rom", "inrom", "outrom", "pit"];
      
      const isAnyFieldEmpty = requiredFields.some(field => !formData[field]);
  
      if (isAnyFieldEmpty) {
        alert("Mohon isi semua data yang diperlukan.");
        return;
      }
  
      let data = {
        ...formData,
      };
      if(postData){
        let datainsert = await Transaksi.postCreateTransaction(data);
        setPostData(true)
      }else{
        let dataUpdate = await Transaksi.patchEditTransaction(tid,data);
        setPostData(true)
      }
  

      setMessage({
        type: "success",
        content: "Data berhasil di input",
      });
  
      // Optionally, you can reload the window after a delay (e.g., 2 seconds)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error inserting  :", error);
  
      // Display error toast
      setMessage({
        type: "error",
        content: "Gagal menginput data. Silahkan coba kembali!",
      });
    }
  };
  

  const handleReset = () => {
    setFormData({
      inrom: "",
      outrom: "",
      tonnage: "",
      dumpingpoint: "",
    });
    setMessage(null);
    setIsFormValid(false);
    setPostData(true)
  };

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
    [formData, seamOptions]
  );
// console.log(11111,formData)
  return (
    <>
      <div
        className="form-wrapper wrapper"
        style={{ marginBottom: "0", paddingTop: "3em" }}>
        <div className="input-base">
          <FormComponent components={comp} handleChange={handleChange} />
        </div>
        <div className="btn-wrapper">
          <Button
            onClick={handleSubmit}
            icon={<Save24Regular />}
            iconPosition="after"
            style={{ backgroundColor: "#6aa146", color: "#ffffff" }}>
            Simpan
          </Button>
          <Button
            icon={<ArrowReset24Regular />}
            iconPosition="after"
            style={{ backgroundColor: "#ff5722", color: "#ffffff" }}
            onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
      <div className={classes.messageContainer}>
        {message && (
          <MessageBar intent={message.type}>
            <MessageBarBody>
              <MessageBarTitle>{message.content}</MessageBarTitle>
              {message.type === "error" && (
                <Link onClick={() => setMessage(null)}>Dismiss</Link>
              )}
            </MessageBarBody>
          </MessageBar>
        )}
      </div>
    </>
  );
};

export default InputHauling;
