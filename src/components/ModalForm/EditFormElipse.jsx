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
  EuiText
} from '@elastic/eui';
import masterElipseService from '../../services/masterElipse';

const ModalFormElipseEdit = ({ row }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [unitNo, setUnitNo] = useState("");
  const [showNo, setShowNo] = useState("");
  const [model, setModel] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [cap, setCap] = useState("");
  const [fbr, setFbr] = useState("");
  const [position, setPosition] = useState("");
  const [protes, setProtes] = useState("");
  const [elipse, setElipse] = useState("");
  const [ket, setKet] = useState("");
  const user = JSON.parse(localStorage.getItem('user_data'));

  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();
  const closeModal = () => setIsModalVisible(false);

  useEffect(() => {
    setUnitNo(row.equip_no_unit || "");
    setShowNo(row.equip_no_show || "");
    setModel(row.equip_model_egi || "");
    setDesc(row.equip_description || "");
    setCat(row.equip_category || "");
    setCap(row.equip_cap_tank || "");
    setFbr(row.equip_fbr || "");
    setPosition(row.equip_position || "");
    setProtes(row.equip_owner_protes || "");
    setElipse(row.equip_owner_elipse || "");
    setKet(row.keterangan || "");
  }, [row]);

  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [resultStatus, setResultStatus] = useState('');
  const showResultModal = () => setIsResultModalVisible(true);
  const closeResultModal = () => {
    setIsResultModalVisible(false);
    window.location.reload();
  };

  const [isEditResult, setIsEditResult] = useState(false);
  const [editMessage, setEditMessage] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const showEditModal = () => setIsEditResult(true);
  const closeEditModal = () => {
    setIsEditResult(false);
    window.location.reload();
  };

  const [isConfirmStatus, setIsConfirmStatus] = useState(false);
  const showConfirmModal = () => setIsConfirmStatus(true);
  const closeConfirmModal = () => setIsConfirmStatus(false);

  const [isConfirmEditStatus, setIsConfirmEditStatus] = useState(false);
  const showConfirmEditModal = () => setIsConfirmEditStatus(true);
  const closeConfirmEditModal = () => {
    setIsConfirmEditStatus(false);
    setIsModalVisible(false);
  };

  const [noChangeModal, setNoChangeModal] = useState(false);
  const showNoChangeModal = () => setNoChangeModal(true);
  const closeNoChangeModal = () =>{
    setNoChangeModal(false)
    closeEditModal(false);
  } 

  const isDataChanged = () => {
    return (
      unitNo !== (row.equip_no_unit || "") ||
      showNo !== (row.equip_no_show || "") ||
      model !== (row.equip_model_egi || "") ||
      desc !== (row.equip_description || "") ||
      cat !== (row.equip_category || "") ||
      cap !== (row.equip_cap_tank || "") ||
      fbr !== (row.equip_fbr || "") ||
      position !== (row.equip_position || "") ||
      protes !== (row.equip_owner_protes || "") ||
      elipse !== (row.equip_owner_elipse || "") ||
      ket !== (row.keterangan || "")
    );
  };

  const handleEditData = async () => {
    closeModal();
    try {
      const data = {
        id: row.id,
        equip_no_unit: unitNo,
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
        creation_by: user.JDE,
      };
      const res = await masterElipseService.updateElipses(data);
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
      <EuiButtonIcon iconType="pencil" onClick={() => setIsModalVisible(true)} />
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
                <EuiFormRow label="Nomor Unit" style={{paddingTop:"15px"}}>
                  <EuiFieldText value={unitNo} onChange={(e) => setUnitNo(e.target.value)} />
                </EuiFormRow>
                <EuiFormRow label="Show No">
                  <EuiFieldText value={showNo} onChange={(e) => setShowNo(e.target.value)} />
                </EuiFormRow>
                <EuiFormRow label="Model">
                  <EuiFieldText value={model} onChange={(e) => setModel(e.target.value)} />
                </EuiFormRow>
                <EuiFormRow label="Deskripsi">
                  <EuiFieldText value={desc} onChange={(e) => setDesc(e.target.value)} />
                </EuiFormRow>
                <EuiFormRow label="Kategori">
                  <EuiFieldText value={cat} onChange={(e) => setCat(e.target.value)} />
                </EuiFormRow>
                <EuiFormRow label="Capacity/L">
                  <EuiFieldText value={cap} onChange={(e) => setCap(e.target.value)} />
                </EuiFormRow>
                <EuiFormRow label="FBR">
                  <EuiFieldText value={fbr} onChange={(e) => setFbr(e.target.value)} />
                </EuiFormRow>
                <EuiFormRow label="Posisi">
                  <EuiFieldText value={position} onChange={(e) => setPosition(e.target.value)} />
                </EuiFormRow>
                <EuiFormRow label="Owner Protes">
                  <EuiFieldText value={protes} onChange={(e) => setProtes(e.target.value)} />
                </EuiFormRow>
                <EuiFormRow label="Owner Elipse">
                  <EuiFieldText value={elipse} onChange={(e) => setElipse(e.target.value)} />
                </EuiFormRow>
                <EuiFormRow label="Keterangan">
                  <EuiFieldText value={ket} onChange={(e) => setKet(e.target.value)} />
                </EuiFormRow>
              </EuiFlexGrid>
            </EuiForm>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton onClick={closeModal} color="text">Cancel</EuiButton>
            <EuiButton
              onClick={() => {
                if (!isDataChanged()) {
                  showNoChangeModal();
                } else {
                  showConfirmEditModal();
                }
              }}
              style={{ background: "#73A33F", color: "white" }}
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
        onClick={showConfirmModal}
      />

      {/* Modal Hasil Edit */}
      {isEditResult && (
        <EuiModal>
          <EuiModalBody>
            <EuiText style={{ fontSize: '22px', color: editStatus === 'Success!' ? '#73A33F' : '#D52424', fontWeight: '600', paddingTop:"30px" }}>
              {editMessage}
            </EuiText>
            <EuiText style={{ fontSize: '15px', marginTop: '20px' }}>
              {editStatus === 'Success!' ? 'Data berhasil terupdate.' : 'Data belum terupdate.'}
            </EuiText>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton onClick={closeEditModal} style={{ background: "#73A33F", color: "white" }}>
              Tutup
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}

      {/* Modal Hapus */}
      {isResultModalVisible && (
        <EuiModal>
          <EuiModalBody>
            <EuiText style={{ fontSize: '22px', color: resultStatus === 'success' ? '#73A33F' : '#D52424', fontWeight: '600', marginTop: '35px' }}>
              {resultMessage}
            </EuiText>
            <EuiText style={{ fontSize: '15px', marginTop: '35px' }}>
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

      {/* Konfirmasi Hapus */}
      {isConfirmStatus && (
        <EuiModal onClose={closeConfirmModal}>
          <EuiModalBody>
            <EuiText style={{ fontSize: '20px', marginTop: '35px'  }}>
              Apakah Anda yakin ingin menghapus data?
            </EuiText>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton onClick={handleDelete} style={{ background: "#73A33F", color: "white" }}>
              Ya
            </EuiButton>
            <EuiButton onClick={closeConfirmModal} color="danger">
              Tutup
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}

      {/* Konfirmasi Simpan */}
      {isConfirmEditStatus && (
        <EuiModal onClose={closeConfirmEditModal}>
          <EuiModalBody>
            <EuiText style={{ fontSize: '22px', fontWeight: '200', paddingTop:"30px" }}>
              Apakah Anda ingin menyimpan perubahan?
            </EuiText>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton onClick={handleEditData} style={{ background: "#73A33F", color: "white" }}>
              Ya
            </EuiButton>
            <EuiButton onClick={closeConfirmEditModal} color="danger">
              Tutup
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}

      {/* Modal Tidak Ada Perubahan */}
      {noChangeModal && (
        <EuiModal onClose={closeNoChangeModal}>
          <EuiModalBody>
            <EuiText style={{ fontSize: '22px', color: '#141443ff', fontWeight: '600', marginTop: '35px' }}>
             Informasi!
            </EuiText>
            <EuiText style={{ fontSize: '15px', marginTop: '10px' }}>
              Anda belum melakukan perubahan apapun pada data.
            </EuiText>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton onClick={closeNoChangeModal} style={{ background: "#73A33F", color: "white" }}>
              Tutup
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}
    </>
  );
};

export default ModalFormElipseEdit;
