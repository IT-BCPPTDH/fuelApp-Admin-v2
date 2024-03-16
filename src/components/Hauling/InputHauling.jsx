import { useState, useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Button,
  MessageBar,
  MessageBarTitle,
  MessageBarBody,
  Link,
  makeStyles,
  MessageBarActions,
} from "@fluentui/react-components";
import FormComponent from "../FormComponent";
import {
  Save24Regular,
  ArrowReset24Regular,
  DismissRegular,
} from "@fluentui/react-icons";
import { insertFormDataHauling } from "../../helpers/indexedDB/insert";
import { updateFormDataHauling } from "../../helpers/indexedDB/editData";
import {
  unitOptionsData,
  shiftOptionsData,
  loaderOptionsData,
  dumpingpointOptionsData,
  pitOptionsData,
  seamOptionsData,
  tonnageOptionsData,
} from "../../helpers/optionHelper";
import "./CoalHauling.css";

const useStyles = makeStyles({
  messageContainer: {
    width: "300px",
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
  },
});

const InputHauling = ({
  dataEdit,
  postData,
  setPostData,
  dataId,
  setDataupdated,
}) => {
  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const [seamOptions, setSeamOptions] = useState([]);
  const [formData, setFormData] = useState({});
  const [seamDataOptions] = useState(seamOptionsData);
  const [unitOptions] = useState(unitOptionsData);
  const [shiftOptions] = useState(shiftOptionsData);
  const [loaderOptions] = useState(loaderOptionsData);
  const [dumpingpointOptions] = useState(dumpingpointOptionsData);
  const [pitOptions] = useState(pitOptionsData);
  const [tonnageOptions] = useState(tonnageOptionsData);

  const determineShift = useCallback(() => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18 ? "Day" : "Night";
  }, []);

  useEffect(() => {
    setFormData({
      tanggal: dataEdit?.tanggal ?? new Date(),
      shift: dataEdit?.shift ?? determineShift(),
      unitno: dataEdit?.unitno ?? "",
      operator: dataEdit?.operator ?? "",
      loader: dataEdit?.loader ?? "",
      tonnage: dataEdit?.tonnage ?? "",
      seam: dataEdit?.seam ?? "",
      dumpingpoint: dataEdit?.dumpingpoint ?? "",
      rom: dataEdit?.rom ?? "",
      inrom: dataEdit?.inrom ?? "",
      outrom: dataEdit?.outrom ?? "",
      pit: dataEdit?.pit ?? "",
    });

    setSeamOptions(seamDataOptions["PIT A NORTH 1"]);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEdit, seamDataOptions]);

  const checkValue = (value) => {
    if (value.length === 3 && value.indexOf(':') === -1) {
        return false; 
    }
    if (value.length > 5) {
        return false; 
    }
    return true; 
  }

  const handleChange = useCallback(
    (e, v) => {
      const { name, value } = v;
      if (name === "inrom" || name === "outrom") {
        
        const filter =  /^[0-9.:]+$/;

        let filteredValue = checkValue(value) && filter.test(value) ? value : "";

        if (name === "outrom") {
          const dataInRom = formData?.inrom.replace(":", "");
          let dataOutRom = filteredValue.includes(":") ? filteredValue.replace(":", "") : filteredValue;
          
          if(dataOutRom.length === 4){
            if (Number(dataOutRom) < Number(dataInRom) || Number(dataOutRom) == Number(dataInRom) ) {
              filteredValue = "";
            } 
          }
        }

        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: filteredValue,
        }));

        // const filteredValue = ''
        // setFormData((prevFormData) => ({ ...prevFormData, [name]: filter.test(value) ? value : filteredValue}));
      } else {
        if (name === "pit") {
          let a = pitOptions?.find((v) => v === value);
          if (a) {
            setSeamOptions(seamDataOptions[a]);
          }
        }

        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      }
    },
    [formData,setFormData, setSeamOptions, pitOptions, seamDataOptions]
  );

  const handleReset = useCallback(() => {
    setFormData({
      tanggal: new Date(),
      shift: determineShift(),
      unitno: "",
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
    setMessage(false);
    setPostData(true);
  }, [setPostData,determineShift]);

  const handleSubmit = useCallback(async () => {
    try {
      let dbInserted = false;
      let message = ""
      const requiredFields = [
        "tanggal",
        "shift",
        "unitno",
        "operator",
        "loader",
        "tonnage",
        "seam",
        "dumpingpoint",
        "rom",
        "inrom",
        "outrom",
        "pit",
      ];

      const isAnyFieldEmpty = requiredFields.some((field) => !formData[field]);

      if (isAnyFieldEmpty) {
        alert("Mohon isi semua data yang diperlukan.");
        return;
      }

      let data = {
        ...formData,
        status: "pending",
      };

      // console.log(postData)

      if (postData) {
        const inserted = await insertFormDataHauling(data);
        if (inserted) {
          dbInserted = true;
          message = "Data berhasil di input"
        }
      } else {
        // console.log(dataId, data)
        // let dataUpdate = await Transaksi.patchEditTransaction(tid, data);
        const updated = await updateFormDataHauling(dataId, data);
        // console.log(updated)
        if (updated) {
          dbInserted = true;
          message = "Data berhasil di perbarui"
        }
      }

      if (dbInserted) {
        handleReset();
        setDataupdated(true);
        dbInserted = false;
      }

      setMessage({
        type: "success",
        content: message,
      });
    } catch (error) {
      console.error("Error inserting  :", error);

      setMessage({
        type: "error",
        content: "Gagal menginput data. Silahkan coba kembali!",
      });
    }
  }, [formData, postData, dataId, setDataupdated, handleReset]);

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
        name: "unitno",
        grid: "col-4",
        label: "No Unit",
        readOnly: false,
        disabled: false,
        value: formData.unitno,
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
        placeholder: "Nama Operator",
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
        type: "Combobox",
        options: tonnageOptions,
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
        placeholder: "Contoh: E",
      },
      {
        name: "inrom",
        grid: "col-4",
        label: "In Rom",
        readOnly: false,
        disabled: false,
        value: formData.inrom,
        type: "Input",
        placeholder: "Contoh: 12:00"
      },
      {
        name: "outrom",
        grid: "col-4",
        label: "Out Rom",
        readOnly: false,
        disabled: false,
        value: formData.outrom,
        type: "Input",
        placeholder: "Contoh: 12:00"
      },
    ],
    [
      formData,
      seamOptions,
      dumpingpointOptions,
      loaderOptions,
      pitOptions,
      shiftOptions,
      unitOptions,
      tonnageOptions
    ]
  );

  const dismissMessage = () => {
    setMessage(null);
  };

  return (
    <>
      <div
        className="form-wrapper wrapper"
        style={{ marginBottom: "0", paddingTop: "3em", marginTop: "0" }}>
        <div className="input-base">
          <FormComponent components={comp} handleChange={handleChange} />
        </div>
        <hr />
        <div className="btn-wrapper">
          <Button
            // disabled={!isFormValid}
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
            <MessageBarActions
              containerAction={
                <Button
                  onClick={dismissMessage}
                  aria-label="dismiss"
                  appearance="transparent"
                  icon={<DismissRegular />}
                />
              }></MessageBarActions>
          </MessageBar>
        )}
      </div>
    </>
  );
};

export default InputHauling;

InputHauling.propTypes = {
  dataEdit: PropTypes.any,
  postData: PropTypes.any,
  setPostData: PropTypes.any,
  dataId: PropTypes.any,
  setDataupdated: PropTypes.any,
};
