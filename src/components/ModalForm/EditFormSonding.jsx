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
import sondingService from '../../services/masterSonding';

const ModalSondingnEdit = ({row}) => {
  console.log(row)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stations, setStations] = useState(row.station || "")
  const [takaranCM, setTakaranCM] = useState(row.cm || "")
  const [takaranLiter, setTakaranLiter] = useState(row.liters || "")
  const [site, setSite] = useState(row.site || "")
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
        id:row.id,
        station: stations,
        cm: takaranCM,
        liters: takaranLiter,
        site: site,
        updated_by: user.JDE
      };
      const res = await sondingService.updateSonding(data)
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
      const res = await sondingService.delSonding(row.id);
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
            <EuiModalHeaderTitle id={modalTitleId}> Edit Sonding Master</EuiModalHeaderTitle>
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
                Data telah dihapus dari peradaban - By Admin Cantik;p
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

export default ModalSondingnEdit;
