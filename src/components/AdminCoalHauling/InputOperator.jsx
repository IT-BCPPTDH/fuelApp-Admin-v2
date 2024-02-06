import React, { useState, useEffect } from 'react';
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
  import './DataMaster.css'


const useStyles = makeStyles({
    card: {
      width: "10px",
    //   maxWidth: "100%",
    //   height: "10px",
    },
    control: {
      marginTop: "30px",
      backgroundColor: "#f5f5f5",
    },
  });
  

const InputOperator = () => {
  const [formData, setFormData] = useState({
    id: "",
    deskripsi: "",
    nojde: "",
  });

  const comp = [
    {
      name: "id",
      grid: "col-3",
      label: "ID",
    //   value: formData.id,
      type: "Input",
    },
    {
      name: "deskripsi",
      grid: "col-3",
      label: "Deskripsi",
    //   value: formData.nounit,
      type: "Input",
    },
    {
      name: "nojde",
      grid: "col-3",
      label: "No Jde",
    //   value: formData.model,
      type: "Input",
    },
  ];

  const styles = useStyles();
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
        className="form-wrapper "
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

export default InputOperator;
