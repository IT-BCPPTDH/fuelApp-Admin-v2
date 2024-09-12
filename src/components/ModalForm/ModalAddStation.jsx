import React, { useState } from 'react';
import {
  EuiButton,
  EuiFieldText,
  EuiFlexGrid,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  useGeneratedHtmlId,
  EuiOverlayMask
} from '@elastic/eui';
import moment from 'moment';
import stationService from '../../services/stationDashboard';

const ModalFormStation = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();
  const [stationName, setStationName] = useState("")
  const [stationType, setStationType] = useState("")
  const [capacity, setCapacity] = useState(0)
  const [nozel, setNozel] = useState(0)
  const [modalType, setModalType] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  
  const user = JSON.parse(localStorage.getItem('user_data'))

  const closeModal = () => {
    setIsModalVisible(false);
    setModalType('');      
    setModalMessage('');   
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
    try {
      if (data.fuel_station_name && data.fuel_station_type) {
        await stationService.insertStation(data).then((res) =>{
          if(res.status == 200){
            setModalType('Success!');
            setModalMessage('Data successfully saved!');
            closeModal();
          }else
            setModalType('Failed');
            setModalMessage('Data not saved!');
            closeModal();
        })
      } else {
        throw new Error('Failed to save data. Missing required fields.');
      }
    } catch (error) {
      setModalType('error');
      setModalMessage(error.message);
    }

    setIsModalVisible(true); 
  };

  return (
    <>
      <EuiButton style={{background:"#1B46D9", color:"white"}}  onClick={showModal}>Tambah Station</EuiButton>
      {isModalVisible && (
        <EuiModal
          aria-labelledby={modalTitleId}
          onClose={closeModal}
          initialFocus="[name=popswitch]"
          style={{ width: "880px" }}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitleId}> Add New Station</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
          <EuiForm id={modalFormId} component="form">
              <EuiFlexGrid columns={2}>
                <EuiFormRow label="Fuel Station Name">
                  <EuiFieldText 
                  name='station'
                  placeholder='Input'
                  onChange={(e) => setStationName(e.target.value)}
               />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}} label="Capacity/L">
                  <EuiFieldText 
                  name='capacity'
                  placeholder='Input'
                  onChange={(e) => setCapacity(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Type">
                  <EuiFieldText 
                  name='type'
                  placeholder='Input'
                  onChange={(e) => setStationType(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Nozal Qty">
                  <EuiFieldText 
                  name='qty'
                  placeholder='Input'
                  onChange={(e) => setNozel(e.target.value)}
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
                const formElement = document.getElementById(modalFormId);
                if (formElement) {
                  formElement.dispatchEvent(new Event('submit')); 
                }
                closeModal();  
                handleSubmit(); 
              }}
              fill
            >
              Save
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}

      {modalType && (
        <EuiOverlayMask>
          <EuiModal onClose={closeModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>{modalType === 'success' ? 'Success' : 'Error'}</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <p>{modalMessage}</p>
            </EuiModalBody>
            <EuiModalFooter>
              <EuiButton 
              style={{
                background: "#73A33F",
                color: "white",
                width: "100px",
              }}
              onClick={closeModal} fill>
                Close
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      )}
    </>
  );
};

export default ModalFormStation;
