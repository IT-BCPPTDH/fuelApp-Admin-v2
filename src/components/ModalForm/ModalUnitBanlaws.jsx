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
  EuiSelect,
  EuiTextArea,
  useGeneratedHtmlId,
} from '@elastic/eui';
import UnitBanlawsService from '../../services/unitBanlaws';


const ModalFormUnit = ({item}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();
  const [unitInput, setUnitInput] = useState("")
  const [unitElipse, setUnitElipse] = useState("")
  const [owner, setOwner] = useState("")
  const [pin, setPin] = useState("")
  const [unitBanlaws, setUnitBanlaws] = useState("")
  const user = JSON.parse(localStorage.getItem('user_data'))
  const [modalType, setModalType] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const closeModal = () => {
    setIsModalVisible(false);
    setModalType('');      
    setModalMessage('');   
  };

  const handleSubmit = async() => {
    const data = {
        unit_input: unitInput,
        unit_elipse: unitElipse,
        owner: owner,
        pin_banlaw: pin,
        unit_banlaw: unitBanlaws,
        creation_by: user.JDE
    };
    try {
        await UnitBanlawsService.insertUnitBanlaws(data).then((res) =>{
            if(res.status == 200){
              setModalType('Success!');
              setModalMessage('Data successfully saved!');
              closeModal();
            }else
              setModalType('Failed');
              setModalMessage('Data not saved!');
              closeModal();
        })
    } catch (error) {
      setModalType('error');
      setModalMessage(error.message);
    }
    setIsModalVisible(true); 
  };

  return (
    <>
      <EuiButton style={{background:"#1B46D9", color:"white"}}  onClick={showModal}>Tambah Data</EuiButton>
      {isModalVisible && (
        <EuiModal
          aria-labelledby={modalTitleId}
          onClose={closeModal}
          initialFocus="[name=popswitch]"
          style={{ width: "880px" }}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitleId}>Tambah Data Unit</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
          <EuiForm id={modalFormId} component="form">
              <EuiFlexGrid columns={2}>
                <EuiFormRow label="Unit Input">
                    <EuiFieldText 
                      name='input'
                      placeholder='Unit Input'
                      onChange={(e) => setUnitInput(e.target.value)}
                     />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Unit Elipse">
                    <EuiFieldText 
                     name='elipse'
                     placeholder='Unit Elipse'
                     onChange={(e) => setUnitElipse(e.target.value)}
                    />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Owner">
                    <EuiFieldText 
                     name='owner'
                     placeholder='Owner'
                     onChange={(e) => setOwner(e.target.value)}
                    />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Pin Banlaws">
                    <EuiFieldText 
                     name='pin'
                     placeholder='Pin Banlaws'
                     onChange={(e) => setPin(e.target.value)}
                    />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Unit Banlaws">
                    <EuiFieldText 
                     name='unit'
                     placeholder='Unit Banlaws'
                     onChange={(e) => setUnitBanlaws(e.target.value)}
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

export default ModalFormUnit;
