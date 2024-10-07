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
  EuiText
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

  const [isSubmitResult, setIsSubmitResult] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('');
  const [submiStatus, setSubmitStatus] = useState(''); 
  const showSubmitModal = () => setIsSubmitResult(true);
  const closeSubmitModal = () => {
    setIsSubmitResult(false)
    window.location.reload();
  }

  const [isConfirmAddStatus, setIsConfirmAddStatus] = useState(false)
  const showConfirmAddModal = () => setIsConfirmAddStatus(true);
  const closeConfirmAddModal = () => {
    setIsConfirmAddStatus(false)
    // setIsModalVisible(false)
  }

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
            setSubmitStatus('Success!');
            setSubmitMessage('Data successfully saved!');
            closeSubmitModal();
          }else
          setSubmitStatus('Failed');
          setSubmitMessage('Data not saved!');
          closeSubmitModal();
        })
      } else {
        throw new Error('Failed to save data. Missing required fields.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error.message);
    } finally{
      showSubmitModal(); 
    }
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
                showConfirmAddModal()
              }}
              fill
            >
              Save
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}

    {isSubmitResult && (
        <EuiModal>
          <EuiModalBody>
            <EuiText style={{
                fontSize: '22px',
                height: '25%',
                marginTop: '25px',
                color: submiStatus === 'Success!' ? '#D52424' : '#73A33F',
                fontWeight: '600',
              }}>
              {submitMessage}
            </EuiText>
            <EuiText style={{
                fontSize: '15px',
                height: '25%',
                marginTop: '35px'
              }}>
                {submiStatus === 'Success!' ? 'Data berhasil terupdate. Silahkan kembali untuk menambah data atau ke halaman utama.'
                : 'Data belum terupdate. Silahkan kembali untuk update data atau ke halaman utama.'}
            </EuiText>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton onClick={closeSubmitModal} style={{ background: "#73A33F", color: "white" }}>
              Tutup
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
    )}

      {isConfirmAddStatus && (
        <EuiModal onClose={closeConfirmAddModal}>
        <EuiModalBody>
          <EuiText style={{
              fontSize: '22px',
              height: '25%',
              marginTop: '25px',
              color: modalType === 'success' ? '#73A33F' : '#D52424',
              fontWeight: '600',
            }}>
            {modalMessage}
          </EuiText>
          <EuiText style={{
              fontSize: '15px',
              height: '25%',
              marginTop: '35px'
            }}>
              Apakah data yang diisi sudah benar ?
          </EuiText>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButton onClick={handleSubmit} style={{ background: "#73A33F", color: "white" }}>
            Ya
          </EuiButton>
          <EuiButton onClick={closeConfirmAddModal} style={{ background: "crimson", color: "white" }}>
            Batal
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
      )}
    </>
  );
};

export default ModalFormStation;
