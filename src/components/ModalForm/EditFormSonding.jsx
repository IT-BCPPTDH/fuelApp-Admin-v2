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
import sondingService from '../../services/masterSonding';

const ModalSondingnEdit = ({row}) => {
  console.log(row)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stations, setStations] = useState(row.station || "")
  const [takaranCM, setTakaranCM] = useState(row.cm || "")
  const [takaranLiter, setTakaranLiter] = useState(row.liters || "")
  const [site, setSite] = useState(row.site || "")
  const [modalType, setModalType] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user_data'));

  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();

  const closeModal = () => {
    setIsModalVisible(false);
    setModalType(''); 
    setModalMessage(''); 
  };

  const handleSubmit = async() => {
    const data = {
      id:row.id,
      station: stations,
      cm: takaranCM,
      liters: takaranLiter,
      site: site,
      updated_by: user.JDE
    };
    try {
        await sondingService.updateSonding(data).then((res) =>{
          console.log(res)
            if(res.status == 200){
              setIsModalVisible(true); 
              setModalType('Success!');
              setModalMessage('Data successfully saved!');
              closeModal();
            }else{
              setIsModalVisible(true); 
              console.log("gagal")
              setModalType('Failed');
              setModalMessage('Data not saved!');
              closeModal();
            }
        })
    } catch (error) {
      setIsModalVisible(true); 
      setModalType('error');
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
                <EuiFormRow label="Station">
                    <EuiFieldText 
                      name='Station'
                      placeholder='Input Station'
                      value={stations}
                      onChange={(e) => setStations(e.target.value)}
                     />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Jumlah (Dalam CM)">
                    <EuiFieldText 
                     name='jmlCm'
                     placeholder='Jumlah(CM)'
                     value={takaranCM}
                     onChange={(e) => setTakaranCM(e.target.value)}
                    />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Jumlah (Dalam Liters)">
                    <EuiFieldText 
                     name='jmlLiter'
                     placeholder='Jumlah(liter)'
                     value={takaranLiter}
                     onChange={(e) => setTakaranLiter(e.target.value)}
                    />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Site">
                    <EuiFieldText 
                     name='site'
                     placeholder='Site'
                     value={site}
                     onChange={(e) => setSite(e.target.value)}
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

export default ModalSondingnEdit;
