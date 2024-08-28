import React, { useState } from 'react';
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
  EuiRadio,
  EuiSelect,
  EuiTextArea,
  useGeneratedHtmlId,
} from '@elastic/eui';
import moment from 'moment';

const ModalFormAddIssued = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndtDate] = useState(moment());
  const [selectedTime, setSelectedTime] = useState(moment());
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const onFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleChange = (date) => {
    setStartDate(date);
  };
  const handleChangeEnd = (date) => {
    setEndtDate(date);
  };

  return (
    <>
      <EuiButton style={{background:"#00BFB3", color:"white"}}  onClick={showModal}>Add Data</EuiButton>
      {isModalVisible && (
        <EuiModal 
          aria-labelledby={modalTitleId}
          onClose={closeModal}
          initialFocus="[name=popswitch]"
        
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitleId}> Add Data</EuiModalHeaderTitle>
            <hr/>
          </EuiModalHeader>
          <EuiModalBody>
          <EuiForm id={modalFormId} component="form">
              <EuiFlexGrid columns={2}>
                <EuiFormRow label="No Unit">
                    <EuiSelect>

                    </EuiSelect>
                   
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Issued">
                  <EuiFieldText 
                  name='issued'
                  placeholder='Input'
               />
                </EuiFormRow>
                <EuiFormRow label="Model Unit">
                    <EuiSelect>
                    </EuiSelect>
                </EuiFormRow>
               
                    {/* <EuiSelect>
                    </EuiSelect> */}
                   <div style={{display:"flex", gap:"15px", marginTop:"40px"}}>
                   <EuiRadio 
                    label="Issued"
                    
                    />
                     <EuiRadio 
                    label="Transfer"
                  
                    />
                     <EuiRadio 
                    label="Receive"
                   
                    />
                     <EuiRadio 
                    label="Receive KPC"
                  
                    />
                   </div>
                   <EuiFormRow label="HM-KM">
                   <EuiFieldText 
                        name='hmkm'
                        placeholder='Input'
                    />
                </EuiFormRow>
                <EuiFormRow  style={{display:"flex", gap:"10px", marginTop:"-5px"}}label="Flow Meter">
                  <div  style={{display:"flex", gap:"10px", marginTop:"0px"}}>
                  <EuiFieldText 
                        name='hmkm'
                        placeholder='Input'
                    />
                     <EuiFieldText 
                        name='hmkm'
                        placeholder='Input'
                    />
                  </div>
                </EuiFormRow>
                <EuiFormRow label="Owner">
                   <EuiFieldText 
                        name='owner'
                        placeholder='Input'
                    />
                </EuiFormRow>
                <EuiFormRow label="Jam Refueling">
                  <div  style={{display:"flex", gap:"10px"}}>
                  <EuiDatePicker
                        showTimeSelect
                        showTimeSelectOnly
                        selected={startDate}
                        onChange={handleChange}
                        dateFormat="hh:mm a"
                        timeFormat="hh:mm a"
                        injectTimes={[
                            moment().hours(0).minutes(1),
                            moment().hours(0).minutes(5),
                            moment().hours(23).minutes(59),
                        ]}
                        />
                
                        <EuiDatePicker
                        showTimeSelect
                        showTimeSelectOnly
                        selected={endDate}
                        onChange={handleChangeEnd}
                        dateFormat="hh:mm a"
                        timeFormat="hh:mm a"
                        injectTimes={[
                            moment().hours(0).minutes(1),
                            moment().hours(0).minutes(5),
                            moment().hours(23).minutes(59),
                        ]}
                        />
                  </div>
                </EuiFormRow>
                <EuiFormRow label="Employee Id">
                    <EuiSelect>
                    </EuiSelect>
                </EuiFormRow>
                <EuiFormRow label="Full Name">
                <EuiFieldText 
                        name='fullname'
                        placeholder='Input'
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

export default ModalFormAddIssued;
