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
  EuiOverlayMask,
  EuiButtonIcon,
  EuiCheckbox,
  EuiText
} from '@elastic/eui';
import UnitBanlawsService from '../../services/unitBanlaws';
import UserService from '../../services/UserService';

const ModalEditUser = ({row}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(row.id);
  const [formData, setFormData] = useState({
    jde: row.JDE || "",
    fullname: row.fullname || "",
    position: row.position || "",
    division: row.division || "",
    fuelman: row.fuelman || false,
    admin_fuel: row.admin_fuel || false
  });
  const user = JSON.parse(localStorage.getItem('user_data'));
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [resultStatus, setResultStatus] = useState(''); 
  const showResultModal = () => setIsResultModalVisible(true);
  const closeResultModal = () => {
    setIsResultModalVisible(false)
    window.location.reload();
  }
  const [isEditResult, setIsEditResult] = useState(false)
  const [editMessage, setEditMessage] = useState('');
  const [editStatus, setEditStatus] = useState(''); 
  const showEditModal = () => setIsEditResult(true);
  const closeEditModal = () => {
    setIsEditResult(false)
    window.location.reload();
  }

  useEffect(() => {
    setFormData({
      jde: row.JDE || "",
      fullname: row.fullname || "",
      position: row.position || "",
      division: row.division || "",
      fuelman: row.fuelman || "",
      admin_fuel: row.admin_fuel || "",
      fuelman: row.fuelman || false,
      admin_fuel: row.admin_fuel || false
    });
    setEditingId(row.id);
  }, [row]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: checked
    }));
  };

  const handleEditData = async () => {
    closeModal()
    try {
      const updateList = {id: row.id, ...formData}
      const res = await UserService.updateMasterDataUser(updateList)
      if (res.status === '200') {
          setEditStatus('Success!');
          setEditMessage('Data successfully saved!');
      } else {
          setEditStatus('Failed');
          setEditMessage('Data not saved!');
      }
    } catch (error) {
      console.log("first", error)
      setEditStatus('Error');
      setEditMessage('Terjadi kesalahan saat update data. Data tidak tersimpan!');
    } finally {
      showEditModal();
    }
  };

  const handleDelete = async () => {
    try {
      const res = await UserService.deleteUser(row.id);
      if (res.status === '200') {
        setResultStatus('success');
        setResultMessage('Data berhasil dihapus');
      } else {
        setResultStatus('failure');
        setResultMessage('Data gagal dihapus');
      }
    } catch (error) {
      setResultStatus('error');
      setResultMessage('Terjadi kesalahan saat menghapus data');
    } finally {
      showResultModal();
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
            <EuiModalHeaderTitle id={modalTitleId}> Edit Employee</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiForm id={modalFormId} component="form">
              <EuiFlexGrid columns={2}>
                <EuiFormRow label="Employee ID">
                    <EuiFieldText 
                      name='jde'
                      placeholder='Employee Id'
                      value={formData.jde||""}
                      onChange={handleChange}
                     />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Fullname">
                    <EuiFieldText 
                     name='fullname'
                     placeholder='Fullname'
                     value={formData.fullname}
                     onChange={handleChange}
                    />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Position">
                    <EuiFieldText 
                     name='position'
                     placeholder='Position'
                     value={formData.position}
                     onChange={handleChange}
                    />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Division">
                    <EuiFieldText 
                     name='division'
                     placeholder='Division'
                     value={formData.division}
                     onChange={handleChange}
                    />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Access 1">
                    <EuiCheckbox
                      id="fuelman"
                      name='fuelman'
                      label="Fuelman"
                      checked={formData.fuelman}
                      onChange={handleCheckboxChange}
                    />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Access 2">
                    <EuiCheckbox
                      id="admin"
                      label="Admin"
                      name='admin_fuel'
                      checked={formData.admin_fuel}
                      onChange={handleCheckboxChange}
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
                handleEditData();
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
        onClick={() => handleDelete()}
        title="Delete"
      />
     

      {isEditResult && (
        <EuiModal>
          <EuiModalBody>
            <EuiText style={{
                fontSize: '22px',
                height: '25%',
                marginTop: '25px',
                color: editStatus === 'success' ? '#D52424' : '#73A33F',
                fontWeight: '600',
              }}>
              {editMessage}
            </EuiText>
            <EuiText style={{
                fontSize: '15px',
                height: '25%',
                marginTop: '35px'
              }}>
                {editStatus === 'Success!' ? 'Data berhasil terupdate. Silahkan kembali untuk menambah data atau ke halaman utama.'
                : 'Data belum terupdate. Silahkan kembali untuk update data atau ke halaman utama.'}
            </EuiText>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton onClick={closeEditModal} style={{ background: "#73A33F", color: "white" }}>
              Tutup
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}

      {isResultModalVisible && (
        <EuiModal>
          <EuiModalBody>
            <EuiText style={{
                fontSize: '22px',
                height: '25%',
                marginTop: '25px',
                color: resultStatus === 'success' ? '#73A33F' : '#D52424',
                fontWeight: '600',
              }}>
              {resultMessage}
            </EuiText>
            <EuiText style={{
                fontSize: '15px',
                height: '25%',
                marginTop: '35px'
              }}>
                Data telah dihapus.
            </EuiText>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton onClick={closeResultModal} style={{ background: "#73A33F", color: "white" }}>
              Tutup
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}
    </>
  );
};

export default ModalEditUser;
