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
 
  EuiButtonIcon,
 
  EuiText
} from '@elastic/eui';
import EquipService from '../../services/EquiptmentService';

const ModalEditEquipment = ({row}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(row.id);
  const [formData, setFormData] = useState({
    unit_no: row.unit_no || "",
    brand: row.brand || "",
    type: row.type || "",
    tank_cap: row.tank_cap || "",
    category: row.category || "",
    usage: row.usage || "",
    site: row.site || "",
    owner: row.owner || "",
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

  const [isConfirmStatus, setIsConfirmStatus] = useState(false)
  const showConfirmModal = () => setIsConfirmStatus(true);
  const closeConfirmModal = () => {
    setIsConfirmStatus(false)
  }

  const [isConfirmEditStatus, setIsConfirmEditStatus] = useState(false)
  const showConfirmEditModal = () => setIsConfirmEditStatus(true);
  const closeConfirmEditModal = () => {
    setIsConfirmEditStatus(false)
    setIsModalVisible(false)
  }

  useEffect(() => {
    setFormData({
      unit_no: row.unit_no || "",
      brand: row.brand || "",
      type: row.type || "",
      tank_cap: row.tank_cap || "",
      category: row.category || "",
      usage: row.usage || "",
      site: row.site || "",
      owner: row.owner || "",
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
      const updateList = {id: row.id, ...formData, updated_by: user.JDE}
      const res = await EquipService.updateEquip(updateList)
      if (res.status === '200') {
          setEditStatus('Success!');
          setEditMessage('Data successfully saved!');
      } else {
          setEditStatus('Failed');
          setEditMessage('Data not saved!');
      }
    } catch (error) {
      setEditStatus('Error');
      setEditMessage('Terjadi kesalahan saat update data. Data tidak tersimpan!');
    } finally {
      showEditModal();
    }
  };

  const handleDelete = async () => {
    try {
      const res = await EquipService.delEquip(row.id);
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
     <EuiButtonIcon iconType="pencil" aria-label="Edit" onClick={() => setIsModalVisible(true)}>Edit</EuiButtonIcon>
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
                <EuiFormRow label="Unit No">
                    <EuiFieldText 
                      name='unit_no'
                      placeholder='Unit No'
                      value={formData.unit_no || ""}
                      onChange={handleChange}
                     />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Description">
                    <EuiFieldText 
                     name='brand'
                     placeholder='Description'
                     value={formData.brand || ""}
                     onChange={handleChange}
                    />
                </EuiFormRow>
                <EuiFormRow label="Tipe Unit" style={{marginTop:"0px"}}>
                  <EuiFieldText 
                      name='type'
                      placeholder='Tipe Unit'
                      value={formData.type || ""}
                      onChange={handleChange}
                  />
                  {/* <EuiSelect 
                   options={equipData.map(items => ({
                    value: items.unit_no,  
                    text: items.unit_no  
                  }))}
                  value={nomorUnit}  
                  onChange={handleApprovalChange}  
                  hasNoInitialSelection
                  >
                  </EuiSelect> */}
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Tank Capacity/L">
                    <EuiFieldText 
                     name='tank_capacity'
                     placeholder='Tank Capacity/L'
                     value={formData.tank_cap || ""}
                     onChange={handleChange}
                    />
                </EuiFormRow>
                <EuiFormRow label="Category" style={{marginTop:"0px"}}>
                <EuiFieldText 
                      name='category'
                      placeholder='Category'
                      value={formData.category || ""}
                      onChange={handleChange}
                  />
                  {/* <EuiSelect 
                   options={equipData.map(items => ({
                    value: items.unit_no,  
                    text: items.unit_no  
                  }))}
                  value={nomorUnit}  
                  onChange={handleApprovalChange}  
                  hasNoInitialSelection
                  >
                  </EuiSelect> */}
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Usage">
                    <EuiFieldText 
                     name='usage'
                     placeholder='Usage'
                     value={formData.usage || ""}
                     onChange={handleChange}
                    />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Site">
                    <EuiFieldText 
                     name='site'
                     placeholder='Site'
                     value={formData.site || ""}
                     onChange={handleChange}
                    />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}}label="Owner">
                    <EuiFieldText 
                     name='owner'
                     placeholder='Owner'
                     value={formData.owner || ""}
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
                const formElement = document.getElementById(modalFormId);
                if (formElement) {
                  formElement.dispatchEvent(new Event('submit'));
                }
                showConfirmEditModal()
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
        onClick={() => showConfirmModal()}
        title="Delete"
      />
     

      {isEditResult && (
        <EuiModal>
          <EuiModalBody>
            <EuiText style={{
                fontSize: '22px',
                height: '25%',
                marginTop: '25px',
                color: editStatus === 'Success!' ? '#73A33F' :'#D52424',
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

      {isConfirmStatus && (
        <EuiModal onClose={closeConfirmModal}>
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
              Apakah anda yakin ingin menghapus data ?
          </EuiText>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButton onClick={handleDelete} style={{ background: "#73A33F", color: "white" }}>
            Ya
          </EuiButton>
          <EuiButton onClick={closeConfirmModal} style={{ background: "crimson", color: "white" }}>
            Tutup
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
      )}

      {isConfirmEditStatus && (
        <EuiModal onClose={closeConfirmEditModal}>
        <EuiModalBody>
          <EuiText style={{
              fontSize: '22px',
              height: '25%',
              marginTop: '25px',
              color: resultStatus === 'Success!' ? '#73A33F' : '#D52424',
              fontWeight: '600',
            }}>
            {resultMessage}
          </EuiText>
          <EuiText style={{
              fontSize: '15px',
              height: '25%',
              marginTop: '35px'
            }}>
              Apakah anda ingin menyimpan perubahan ?
          </EuiText>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButton onClick={handleEditData} style={{ background: "#73A33F", color: "white" }}>
            Ya
          </EuiButton>
          <EuiButton onClick={closeConfirmEditModal} style={{ background: "crimson", color: "white" }}>
            Tutup
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
      )}
    </>
  );
};

export default ModalEditEquipment;
