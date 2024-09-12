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
  EuiOverlayMask,
  EuiButtonIcon
} from '@elastic/eui';
import moment from 'moment';
import stationService from '../../services/stationDashboard';
import ActionButtons from '../Action';

const ModalFormStationEdit = ({row}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stationName, setStationName] = useState(row.fuel_station_name || "");
  const [stationType, setStationType] = useState(row.fuel_station_type || "");
  const [capacity, setCapacity] = useState(row.fuel_capacity || 0);
  const [nozel, setNozel] = useState(row.fuel_nozel || 0);
  const [modalType, setModalType] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user_data'));

  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();

  const closeModal = () => {
    setIsModalVisible(false);
    setModalType(''); // Reset modal type
    setModalMessage(''); // Reset modal message
  };

  const handleSubmit = async () => {
    console.log(row.id)
    const data = {
      id: row.id,
      fuel_station_name: stationName,
      fuel_station_type: stationType,
      fuel_capacity: capacity,
      fuel_nozel: nozel,
      site: 'BCP',
      updated_by: user.JDE
    };

    try {
      if (data.fuel_station_name && data.fuel_station_type) {
        await stationService.updateStation(data).then((res) => {
          if (res.status === 200) {
            setModalType('Success!');
            setModalMessage('Data successfully saved!');
            closeModal();
          } else {
            setModalType('Failed');
            setModalMessage('Data not saved!');
            closeModal();
          }
        });
      } else {
        throw new Error('Failed to save data. Missing required fields.');
      }
    } catch (error) {
      setModalType('Error');
      setModalMessage(error.message);
    }
  };

  return (
    <>
     <EuiButtonIcon iconType="pencil"  onClick={() => setIsModalVisible(true)}>Edit</EuiButtonIcon>
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
                <EuiFormRow style={{ marginTop: "0px" }} label="Capacity/L">
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
                <EuiFormRow label="Nozel Qty">
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
                handleSubmit();
              }}
              fill
            >
              Save
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}

      <EuiButtonIcon
        iconType="trash"
        aria-label="Delete"
        color="danger"
        onClick={() => alert('Delete button clicked')}
        title="Delete"
      />
     

      {modalType && (
        <EuiOverlayMask>
          <EuiModal onClose={closeModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>{modalType === 'Success' ? 'Success' : 'Error'}</EuiModalHeaderTitle>
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
                onClick={closeModal}
                fill
              >
                Close
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      )}
    </>
  );
};

export default ModalFormStationEdit;
