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
import masterElipseService from '../../services/masterElipse';

const ModalAddElipse = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();
  const [unitNo, setUnitNo] = useState("")
  const [showNo, setShowNo] = useState("")
  const [model, setModel] = useState("")
  const [desc, setDesc] = useState("")
  const [cat, setCat] = useState("")
  const [cap, setCap] = useState("")
  const [fbr, setFbr] = useState("")
  const [position, setPosition] = useState("")
  const [protes, setProtes] = useState("")
  const [elipse, setElipse] = useState("")
  const [ket, setKet] = useState("")
  const user = JSON.parse(localStorage.getItem('user_data'))

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
  }

  const handleSubmitData = async () => {
    try {
      const data = {
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
      const res = await masterElipseService.insertElipses(data)
      if (res.status === '200') {
        setSubmitStatus('Success!');
        setSubmitMessage('Data successfully saved!');
      } else {
        setSubmitStatus('Failed');
        setSubmitMessage('Data not saved!');
      }
    } catch (error) {
      setSubmitStatus('Error');
      setSubmitMessage('Terjadi kesalahan saat update data. Data tidak tersimpan!');
    } finally {
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
            <EuiModalHeaderTitle id={modalTitleId}> Add New Data</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
          <EuiForm id={modalFormId} component="form">
              <EuiFlexGrid columns={2}>
                <EuiFormRow label="Nomor Unit">
                  <EuiFieldText 
                  name='unit_no'
                  placeholder='Input'
                  onChange={(e) => setUnitNo(e.target.value)}
               />
                </EuiFormRow>
                <EuiFormRow  style={{marginTop:"0px"}} label="Show No">
                  <EuiFieldText 
                  name='show_no'
                  placeholder='Input'
                  onChange={(e) => setShowNo(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Model">
                  <EuiFieldText 
                  name='model'
                  placeholder='Input'
                  onChange={(e) => setModel(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Deskripsi">
                  <EuiFieldText 
                  name='desc'
                  placeholder='Input'
                  onChange={(e) => setDesc(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Kategori">
                  <EuiFieldText 
                  name='category'
                  placeholder='Input'
                  onChange={(e) => setCat(e.target.value)}
               />
                </EuiFormRow>
                <EuiFormRow  label="Capacity/L">
                  <EuiFieldText 
                  name='capacity'
                  placeholder='Input'
                  onChange={(e) => setCap(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="FBR">
                  <EuiFieldText 
                  name='fbr'
                  placeholder='Input'
                  onChange={(e) => setFbr(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Posisi">
                  <EuiFieldText 
                  name='position'
                  placeholder='Input'
                  onChange={(e) => setPosition(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Owner Protes">
                  <EuiFieldText 
                  name='prostes'
                  placeholder='Input'
                  onChange={(e) => setProtes(e.target.value)}
               />
                </EuiFormRow>
                <EuiFormRow label="Owner Elipse">
                  <EuiFieldText 
                  name='elipse'
                  placeholder='Input'
                  onChange={(e) => setElipse(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Keteragan">
                  <EuiFieldText 
                  name='keterangan'
                  placeholder='Input'
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
          <EuiButton onClick={handleSubmitData} style={{ background: "#73A33F", color: "white" }}>
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

export default ModalAddElipse;
