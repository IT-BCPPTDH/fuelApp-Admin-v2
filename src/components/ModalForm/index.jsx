import React, { useState, useEffect } from 'react';
import {
  EuiButton,
  EuiDatePicker,
  EuiFieldText,
  EuiFlexGrid,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiSelect,
  EuiTextArea,
  useGeneratedHtmlId,
} from '@elastic/eui';
import moment from 'moment';

const ModalForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedTime, setSelectedTime] = useState(moment());
  const [selectedFile, setSelectedFile] = useState(null);

  const [tanggal, setTanggal] = useState("")
  const [Waktu, setWaktu] = useState("")
  const [nomorUnit, setNomorUnit] = useState("")
  const [station, setStation] = useState("")
  const [shift, setShift] = useState("")
  const [model, setModel] = useState("")
  const [hmkm, setHmkm] = useState(0)
  const [qty, setQty] = useState(0)
  const [reason, setReason] = useState("")
  const [picture, setPicture] = useState("")

  // Handle file selection
  const onFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async() => {
    const data = {
      fuel_station_name: stationName,
      fuel_station_type: stationType,
      fuel_capacity: capacity,
      fuel_nozel: nozel,
      site: 'BCP',
      creation_by: user.JDE
    };
    console.log(data)
    // try {
    //   if (data.fuel_station_name && data.fuel_station_type) {
    //     await stationService.insertStation(data).then((res) =>{
    //       if(res.status == 200){
    //         setModalType('Success!');
    //         setModalMessage('Data successfully saved!');
    //         closeModal();
    //       }else
    //         setModalType('Failed');
    //         setModalMessage('Data not saved!');
    //         closeModal();
    //     })
    //   } else {
    //     throw new Error('Failed to save data. Missing required fields.');
    //   }
    // } catch (error) {
    //   setModalType('error');
    //   setModalMessage(error.message);
    // }

    // setIsModalVisible(true); 
  };

  // const fetchUnits = async () => {
  //   try {
  //     const response = await axios.get('/api/units'); 
  //     setUnits(response.data); 
  //   } catch (error) {
  //     console.error('Error fetching units:', error);
  //   }
  // };

  // // Memanggil API ketika komponen di-mount
  // useEffect(() => {
  //   fetchUnits();
  // }, []);

  return (
    <>
      <EuiButton style={{background:"#1B46D9", color:"white"}}  onClick={showModal}>Tambah Kouta</EuiButton>
      {isModalVisible && (
        <EuiModal
          aria-labelledby={modalTitleId}
          onClose={closeModal}
          initialFocus="[name=popswitch]"
          style={{ width: "880px" }}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitleId}> Tambah Kouta</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiForm id={modalFormId} component="form">
              <EuiFlexGrid columns={2}>
                <EuiFlexItem>
                  <EuiFormRow label="Date">
                    <EuiDatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="MMMM d, yyyy"
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiFormRow label="Time">
                    <EuiDatePicker
                      selected={selectedTime}
                      onChange={(time) => setSelectedTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="h:mm "
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFormRow label="Unit No">
                  <EuiSelect>
                    {/* Add options here */}
                  </EuiSelect>
                </EuiFormRow>
                <EuiFormRow style={{marginTop:"0px"}}label="Station">
                  <EuiFieldText 
                  name='station'
                  placeholder='Station'
                  />
                </EuiFormRow>
                <EuiFormRow style={{marginTop:"0px"}}label="Model Unit">
                  <EuiFieldText 
                  name='model_unit'
                  placeholder='Model Unit'
                  disabled />
                </EuiFormRow>
                <EuiFormRow style={{marginTop:"0px"}}label="Shift">
                  <EuiFieldText 
                  name='shift'
                  placeholder='Shift'
                  />
                </EuiFormRow>
                <EuiFormRow label="Id Request">
                  <EuiSelect>
                    {/* Add options here */}
                  </EuiSelect>
                </EuiFormRow>
                <EuiFormRow label="Name Request">
                  <EuiFieldText 
                  name='station'
                  placeholder='Station'
                  disabled />
                </EuiFormRow>
                <EuiFormRow label="Id Apporoval">
                  <EuiSelect>
                    {/* Add options here */}
                  </EuiSelect>
                </EuiFormRow>
                <EuiFormRow label="Name Appove">
                  <EuiFieldText 
                  name='station'
                  placeholder='Station'
                  disabled />
                </EuiFormRow>
                <EuiFormRow label="HmKm">
                  <EuiFieldText 
                   name='hmkm'
                  placeholder='Input Hm Km'
                  />
                </EuiFormRow>
                <EuiFormRow label="Quantity Qouta">
                  <EuiFieldText 
                    name='hmkm'
                  placeholder='Input Quantity'
                  />
                </EuiFormRow>
                <EuiFormRow label="Reason">
                  <EuiTextArea  
                   placeholder='Input Text'/>
                </EuiFormRow>
                <EuiFormRow label="Upload Image">
                  <input
                    type="file"
                    onChange={onFileChange}
                  />
                </EuiFormRow>
              </EuiFlexGrid>
            </EuiForm>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton
              type="button" 
              style={{
                background: "White",
                color: "#73A33F",
                width: "100px",
              }}
              onClick={() => {
                document.getElementById(modalFormId)?.dispatchEvent(new Event('submit')); // Trigger form submission
                closeModal(); 
              }}
              fill
            >
              Cancel
            </EuiButton>
            <EuiButton
             style={{
              background: "#73A33F",
              color: "white",
              width: "100px",
            }}
              type="button" 
              onClick={() => {
                document.getElementById(modalFormId)?.dispatchEvent(new Event('submit')); // Trigger form submission
                closeModal(); 
                handleSubmit()
              }}
              fill
            >
              Save
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}
    </>
  );
};

export default ModalForm;
