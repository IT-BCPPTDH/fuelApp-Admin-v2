import React, { useState, useEffect } from 'react';
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
import stationService from '../../services/stationDashboard';

const EditModalFormStation = ({ stationData, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [stationName, setStationName] = useState("");
  const [stationType, setStationType] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [nozel, setNozel] = useState(0);
  const [modalType, setModalType] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();

  useEffect(() => {
    // Populate form with existing data
    if (stationData) {
      setStationName(stationData.fuel_station_name || "");
      setStationType(stationData.fuel_station_type || "");
      setCapacity(stationData.fuel_capacity || 0);
      setNozel(stationData.fuel_nozel || 0);
    }
  }, [stationData]);

  const closeModal = () => {
    setIsModalVisible(false);
    onClose(); // Notify parent component to close the modal
    setModalType('');
    setModalMessage('');
  };

  const handleSubmit = async() => {
    const data = {
      fuel_station_name: stationName,
      fuel_station_type: stationType,
      fuel_capacity: capacity,
      fuel_nozel: nozel,
    };

    try {
      if (data.fuel_station_name && data.fuel_station_type) {
        await stationService.updateStation(stationData.id, data).then((res) =>{
          if(res.status === 200){
            setModalType('Success!');
            setModalMessage('Data successfully updated!');
          } else {
            setModalType('Failed');
            setModalMessage('Data not updated!');
          }
          closeModal();
        });
      } else {
        throw new Error('Failed to update data. Missing required fields.');
      }
    } catch (error) {
      setModalType('Error');
      setModalMessage(error.message);
    }
  };

  return (
    <>
      {isModalVisible && (
        <EuiModal
          aria-labelledby={modalTitleId}
          onClose={closeModal}
          initialFocus="[name=popswitch]"
          style={{ width: "880px" }}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitleId}> Edit Station</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiForm id={modalFormId} component="form">
              <EuiFlexGrid columns={2}>
                <EuiFormRow label="Fuel Station Name">
                  <EuiFieldText 
                    name='station'
                    placeholder='Input'
                    value={stationName}
                    onChange={(e) => setStationName(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Capacity/L">
                  <EuiFieldText 
                    name='capacity'
                    placeholder='Input'
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Type">
                  <EuiFieldText 
                    name='type'
                    placeholder='Input'
                    value={stationType}
                    onChange={(e) => setStationType(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Nozal Qty">
                  <EuiFieldText 
                    name='qty'
                    placeholder='Input'
                    value={nozel}
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
              onClick={closeModal}
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
              onClick={handleSubmit}
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
              <EuiModalHeaderTitle>{modalType === 'Success!' ? 'Success' : 'Error'}</EuiModalHeaderTitle>
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

export default EditModalFormStation;
