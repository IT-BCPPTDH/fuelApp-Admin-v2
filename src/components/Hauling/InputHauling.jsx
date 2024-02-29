import { useState, useMemo, useEffect, useCallback } from "react";
import PropTypes from 'prop-types'
import { Button, MessageBar, MessageBarTitle, MessageBarBody, Link, makeStyles} from "@fluentui/react-components";
import FormComponent from "../FormComponent";
import { Save24Regular, ArrowReset24Regular } from "@fluentui/react-icons";
import { insertFormDataHauling } from "../../helpers/indexedDB/insert";
import { updateFormDataHauling } from "../../helpers/indexedDB/editData";
import { unitOptionsData, shiftOptionsData, loaderOptionsData, dumpingpointOptionsData, pitOptionsData, seamOptionsData } from "../../helpers/optionHelper";
import "./CoalHauling.css";
// import Transaksi from "../../services/inputCoalHauling";

const useStyles = makeStyles({
  messageContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
  },
});

const InputHauling = ({ dataEdit, postData, setPostData, dataId, setDataupdated }) => {

  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [seamOptions, setSeamOptions] = useState([]);
  const [formData, setFormData] = useState({});

  const [seamDataOptions] = useState(seamOptionsData);
  const [unitOptions] = useState(unitOptionsData)
  const [shiftOptions] = useState(shiftOptionsData)
  const [loaderOptions] = useState(loaderOptionsData)
  const [dumpingpointOptions] = useState(dumpingpointOptionsData)
  const [pitOptions] = useState(pitOptionsData)

  const determineShift = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18 ? "Day" : "Night";
  };

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

    setSeamOptions(seamDataOptions['PIT A NORTH 1']);

  }, [dataEdit, seamDataOptions]);

  const handleChange = useCallback(
    (e, v) => {
      const { name, value } = v;

      if (name === "inrom" || name === "outrom") {

        if(value.selectedTime){

          const hours = value.selectedTime.getHours();
          const minutes = value.selectedTime.getMinutes();
          const second = value.selectedTime.getSeconds();
  
          const addLeadingZero = (num) => (num < 10 ? `0${num}` : num);
  
          const formattedTime = `${addLeadingZero(hours)}:${addLeadingZero(
            minutes
          )}:${addLeadingZero(second)}`;
  
          if (name === "outrom" && formData.inrom > formattedTime) {
            alert("outrom tidak boleh lebih kecil dari inrom");
          } else {
            setFormData((prevFormData) => ({
              ...prevFormData,
              [name]: formattedTime,
            }));
          }
        }
      
      } else {
        if (name === "pit") {
          let a = pitOptions?.find((v) => v === value);
          if(a){
            setSeamOptions(seamDataOptions[a]);
          }
        }

        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      }

      const isValid = Object.values(formData).every((val) => val !== "");
      setIsFormValid(isValid);
    },
    [formData, setIsFormValid, setFormData, setSeamOptions, pitOptions, seamDataOptions]
  );

  const handleSubmit = useCallback(async () => {
    try {

      let dbInserted = false
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
      };

      if (postData) {
        const inserted = await insertFormDataHauling(data);
        if(inserted){
          dbInserted = true
        }
    
      } else {
        // let dataUpdate = await Transaksi.patchEditTransaction(tid, data);
        const updated = await updateFormDataHauling(dataId, data);
        if(updated){
          dbInserted = true
        }
      }

      if(dbInserted){
        handleReset()
        setDataupdated(true)
        dbInserted = false
      }

      setMessage({
        type: "success",
        content: "Data berhasil di input",
      });

    } catch (error) {
      console.error("Error inserting  :", error);

      setMessage({
        type: "error",
        content: "Gagal menginput data. Silahkan coba kembali!",
      });
    }
  }, [formData, postData, dataId, setDataupdated]);

  const handleReset = useCallback(() => {
    setFormData({
      inrom: "",
      outrom: "",
      tonnage: "",
      dumpingpoint: "",
    });
    setMessage(false);
    setIsFormValid(false);
    setPostData(true);

  }, [setPostData]);

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
    [formData, seamOptions, dumpingpointOptions, loaderOptions, pitOptions, shiftOptions, unitOptions]
  );

  return (
    <>
      <div className="form-wrapper wrapper" style={{ marginBottom: "0", paddingTop: "3em" }}>
        <div className="input-base">
          <FormComponent components={comp} handleChange={handleChange} />
        </div>
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
  setDataupdated: PropTypes.any
}