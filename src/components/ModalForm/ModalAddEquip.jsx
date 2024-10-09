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
  EuiText,
  EuiSelect,
} from '@elastic/eui';
import EquipService from '../../services/EquiptmentService';

const ModalAddEquip = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();
  const [data, setData] = useState({
    unit_no: "",
    type: "",
    tank_capacity: "",
    category: "",
    site: "",
    owner: ""
  });
  const [isFuelman, setIsFuelman] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const user = JSON.parse(localStorage.getItem('user_data'))
  const [modalType, setModalType] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const [isSubmitResult, setIsSubmitResult] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('');
  const [submiStatus, setSubmitStatus] = useState(''); 
  const showSubmitModal = () => setIsSubmitResult(true);
  const closeSubmitModal = () => {
    setIsSubmitResult(false)
    window.location.reload();
  }

  const closeModal = () => {
    setIsModalVisible(false);
    setModalType('');      
    setModalMessage('');   
  };

  const [isConfirmAddStatus, setIsConfirmAddStatus] = useState(false)
  const showConfirmAddModal = () => setIsConfirmAddStatus(true);
  const closeConfirmAddModal = () => {
    setIsConfirmAddStatus(false)
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value 
    }));
  };

  const handleSubmit = async(e) => {
    try {
      const updatedData = {
        ...data,
        ...(isFuelman ? { fuelman: true } : {}), 
        ...(isAdmin ? {admin_fuel:true} : {})
      };
      const res = await userServices.insertUser(updatedData)
      if (res.status === '200') {
        setSubmitStatus('Success!');
        setSubmitMessage('Data successfully saved!');
      } else {
        setSubmitStatus('Failed');
        setSubmitMessage('Data not saved!');
      }
    } catch (error) {
      setModalType('error');
      setModalMessage(error.message);
    }finally {
     showSubmitModal();
    }
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
            <EuiModalHeaderTitle id={modalTitleId}>Tambah Data Equipment</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiForm id={modalFormId} component="form">
              <EuiFlexGrid columns={2}>
                <EuiFormRow label="Unit No">
                    <EuiFieldText 
                      name='unit_no'
                      placeholder='Unit No'
                      onChange={handleChange}
                     />
                </EuiFormRow>
                <EuiFormRow label="Tipe Unit" style={{marginTop:"0px"}}>
                  <EuiSelect 
                //    options={equipData.map(items => ({
                //     value: items.unit_no,  
                //     text: items.unit_no  
                //   }))}
                //   value={nomorUnit}  
                //   onChange={handleApprovalChange}  
                //   hasNoInitialSelection
                  >
                  </EuiSelect>
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Tank Capacity/L">
                    <EuiFieldText 
                     name='tank_capacity'
                     placeholder='Tank Capacity/L'
                     onChange={handleChange}
                    />
                </EuiFormRow>
                <EuiFormRow label="Group Id" style={{marginTop:"0px"}}>
                  <EuiSelect 
                //    options={equipData.map(items => ({
                //     value: items.unit_no,  
                //     text: items.unit_no  
                //   }))}
                //   value={nomorUnit}  
                //   onChange={handleApprovalChange}  
                //   hasNoInitialSelection
                  >
                  </EuiSelect>
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Site">
                    <EuiFieldText 
                     name='division'
                     placeholder='Division'
                     onChange={handleChange}
                    />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Owner">
                    <EuiFieldText 
                     name='division'
                     placeholder='Division'
                     onChange={handleChange}
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
                showConfirmAddModal()
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

export default ModalAddEquip;
