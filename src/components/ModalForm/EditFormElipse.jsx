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
  EuiButtonIcon,
  EuiText
} from '@elastic/eui';
import masterElipseService from '../../services/masterElipse';

const ModalFormElipseEdit = ({row}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [unitNo, setUnitNo] = useState(row.equip_no_unit||"")
  const [showNo, setShowNo] = useState(row.equip_no_show||"")
  const [model, setModel] = useState(row.equip_model_egi||"")
  const [desc, setDesc] = useState(row.equip_description||"")
  const [cat, setCat] = useState(row.equip_category|| "")
  const [cap, setCap] = useState(row.equip_cap_tank|| "")
  const [fbr, setFbr] = useState(row.equip_fbr||"")
  const [position, setPosition] = useState(row.equip_position||"")
  const [protes, setProtes] = useState(row.equip_owner_protes||"")
  const [elipse, setElipse] = useState(row.equip_owner_elipse||"")
  const [ket, setKet] = useState(row.keterangan||"")
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


  const handleEditData = async () => {
    closeModal()
    try {
        const data = {
            id: row.id,
            equip_no_unit : unitNo,
            equip_no_show: showNo,
            equip_model_egi: model,
            equip_description: desc,
            equip_category: cat,
            equip_cap_tank: cap,
            equip_fbr: fbr,
            equip_position: position,
            equip_owner_protes: protes,
            equip_owner_elipse: elipse,
            keterangan: ket,
            creation_by: user.JDE
        };
      const res = await masterElipseService.updateElipses(data)
      if (res.status === '200') {
          setEditStatus('Success!');
          setEditMessage('Data successfully saved!');
      } else {
          setEditStatus('Failed');
          setEditMessage('Data not saved!');
      }
    } catch (error) {
      console.log(first)
      setEditStatus('Error');
      setEditMessage('Terjadi kesalahan saat update data. Data tidak tersimpan!');
    } finally {
      showEditModal();
    }
  };

  const handleDelete = async () => {
    try {
      const res = await masterElipseService.delElipses(row.id);
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
            <EuiModalHeaderTitle id={modalTitleId}> Edit Station</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiForm id={modalFormId} component="form">
            <EuiFlexGrid columns={2}>
                <EuiFormRow label="Nomor Unit">
                  <EuiFieldText 
                  name='unit_no'
                  placeholder='Input'
                  value={unitNo}
                  onChange={(e) => setUnitNo(e.target.value)}
               />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}} label="Show No">
                  <EuiFieldText 
                  name='show_no'
                  placeholder='Input'
                  value={showNo}
                  onChange={(e) => setShowNo(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Model">
                  <EuiFieldText 
                  name='model'
                  placeholder='Input'
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Deskripsi">
                  <EuiFieldText 
                  name='desc'
                  placeholder='Input'
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Kategori">
                  <EuiFieldText 
                  name='category'
                  placeholder='Input'
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
               />
                </EuiFormRow>
                <EuiFormRow  label="Capacity/L">
                  <EuiFieldText 
                  name='capacity'
                  placeholder='Input'
                  value={cap}
                  onChange={(e) => setCap(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="FBR">
                  <EuiFieldText 
                  name='fbr'
                  placeholder='Input'
                  value={fbr}
                  onChange={(e) => setFbr(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Posisi">
                  <EuiFieldText 
                  name='position'
                  placeholder='Input'
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Owner Protes">
                  <EuiFieldText 
                  name='prostes'
                  placeholder='Input'
                  value={protes}
                  onChange={(e) => setProtes(e.target.value)}
               />
                </EuiFormRow>
                <EuiFormRow label="Owner Elipse">
                  <EuiFieldText 
                  name='elipse'
                  placeholder='Input'
                  value={elipse}
                  onChange={(e) => setElipse(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Keteragan">
                  <EuiFieldText 
                  name='keterangan'
                  placeholder='Input'
                  value={ket}
                  onChange={(e) => setKet(e.target.value)}
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
                color: editStatus === 'Success!' ? '#D52424' : '#73A33F',
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

export default ModalFormElipseEdit;
