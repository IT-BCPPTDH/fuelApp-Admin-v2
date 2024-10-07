import React, { useState, useEffect } from 'react';
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
  EuiText
} from '@elastic/eui';
import moment from 'moment';
import requestService from '../../services/requestQuota';
import UserService from '../../services/UserService';
import EquipService from '../../services/EquiptmentService';

const ModalForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedTime, setSelectedTime] = useState(moment());
  const [selectedFile, setSelectedFile] = useState(null);

  const [tanggal, setTanggal] = useState(moment())
  const [Waktu, setWaktu] = useState("")
  const [nomorUnit, setNomorUnit] = useState("")
  const [station, setStation] = useState("")
  const [shift, setShift] = useState("")
  const [model, setModel] = useState("")
  const [hmkm, setHmkm] = useState(0)
  const [qty, setQty] = useState(0)
  const [reason, setReason] = useState("")
  const [picture, setPicture] = useState("")
  const [idReq, setidReq] = useState("")
  const [nameReq, setnameReq] = useState("")
  const [idAprv, setidAprv] = useState("")
  const [nameApprv, setnameApprv] = useState("")
  const user = JSON.parse(localStorage.getItem('user_data'))

  const [userData, setUserData] = useState([])
  const [equipData, setEquipData] = useState([])

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

  // Handle file selection
  const onFileChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
  };

  const handleSubmitData = async () => {
    try {
      const data = {
        date :tanggal,
        time:Waktu,
        shift: shift,
        unit_no: nomorUnit,
        model:model,
        hmkm:hmkm,
        station: station,
        quota_request: qty,
        reason:reason,
        document: picture,
        request_by: idReq,
        request_name:nameReq,
        approve_by:idAprv,
        approve_name: nameApprv,
        created_by: user.JDE
      };
      const res = await requestService.insertRequest(data)
      if (res.status === '201') {
        setSubmitStatus('Success!');
        setSubmitMessage('Data successfully saved!');
      } else {
        setSubmitStatus('Failed');
        setSubmitMessage('Data not saved!');
      }
    } catch (error) {
      console.log(first)
      setSubmitStatus('Error');
      setSubmitMessage('Terjadi kesalahan saat update data. Data tidak tersimpan!');
    } finally {
        showSubmitModal();
    }
  };

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const res = await EquipService.getEquip()
        if (res.status != 200) {
          throw new Error('Network response was not ok');
        }else if(res.status == 404){
          setEquipData([]);
        }else{
          setEquipData(res.data);
        }
      } catch (error) {
        console.log(error)
        // setError(error);
      } 
    };

    const fetchUser = async () => {
      try {
        const res = await UserService.getAllUser()
        if (res.status != 200) {
          throw new Error('Network response was not ok');
        }else if(res.status == 404){
          setUserData([]);
        }else{
          setUserData(res.data);
        }
      } catch (error) {
        console.log(error)
        // setError(error);
      } 
    };
    fetchUnit()
    fetchUser()
  }, []);


  const handleApprovalChange = (e) => {
    const val = String(e.target.value)
    const itemSelected = equipData.find((units)=> units.unit_no === val)
    if(itemSelected){
      setNomorUnit(val)
      setModel(itemSelected.type)
    }
  }

  const handleUserChange = (e) => {
    const val = String(e.target.value)
    const itemSelected = userData.find((item)=> item.JDE === val)
    if(itemSelected){
      setidReq(itemSelected.JDE)
      setnameReq(itemSelected.fullname)
    }
  }

  const handleUserApproveChange = (e) => {
    const val = String(e.target.value)
    const itemSelected = userData.find((item)=> item.JDE === val)
    if(itemSelected){
      setidAprv(val)
      setnameApprv(itemSelected.fullname)
    }
  }

  const handleChageDate = (date) => {
    setSelectedDate(date);
    const formattedDates = moment(date).format('YYYY-MM-DD');
    setTanggal(formattedDates)
  };

  const handleChageTime = (time) => {
    setSelectedTime(time);
    const formattedDates = moment(time).format('hh:mm:ss');
    setWaktu(formattedDates)
  };

  return (
    <>
      <EuiButton style={{background:"#1B46D9", color:"white"}}  onClick={showModal}>Tambah Kouta</EuiButton>
      {isModalVisible && (
        <EuiModal
          aria-labelledby={modalTitleId}
          onClose={closeModal}
          initialFocus="[name=popswitch]"
          style={{ width: "880px" }}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitleId}> Tambah Kouta</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiForm id={modalFormId} component="form">
              <EuiFlexGrid columns={2}>
                <EuiFlexItem>
                  <EuiFormRow label="Date">
                    <EuiDatePicker
                      selected={selectedDate}
                      onChange={handleChageDate}
                      dateFormat="DD/MM/YYYY"  
                      locale="en-gb" 
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiFormRow label="Time">
                    <EuiDatePicker
                      selected={selectedTime}
                      onChange={handleChageTime}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={1}
                      dateFormat="hh:mm "
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFormRow label="Unit No">
                  <EuiSelect
                   options={equipData.map(items => ({
                    value: items.unit_no,  
                    text: items.unit_no  
                  }))}
                  value={nomorUnit}  
                  onChange={handleApprovalChange}  
                  hasNoInitialSelection
                  >
                  </EuiSelect>
                </EuiFormRow>
                <EuiFormRow style={{marginTop:"0px"}}label="Station">
                  <EuiFieldText 
                  name='station'
                  placeholder='Station'
                  onChange={(e) => setStation(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow style={{marginTop:"0px"}}label="Model Unit">
                  <EuiFieldText 
                  name='model_unit'
                  placeholder='Model Unit'
                  value={model}
                  disabled />
                </EuiFormRow>
                <EuiFormRow style={{marginTop:"0px"}}label="Shift">
                  <EuiFieldText 
                  name='shift'
                  placeholder='Shift'
                  onChange={(e) => setShift(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Id Request">
                  <EuiSelect
                    options={userData.map(items => ({
                      value: items.JDE,  
                      text: items.JDE  
                    }))}
                    value={idReq}  
                    onChange={handleUserChange}  
                    hasNoInitialSelection
                  >
                    {/* Add options here */}
                  </EuiSelect>
                </EuiFormRow>
                <EuiFormRow label="Name Request">
                  <EuiFieldText 
                  name='request'
                  placeholder='Request Name'
                  value={nameReq}
                  disabled />
                </EuiFormRow>
                <EuiFormRow label="Id Apporoval">
                  <EuiSelect
                  options={userData.map(items => ({
                    value: items.JDE,  
                      text: items.JDE
                  }))}
                  value={idAprv}  
                  onChange={handleUserApproveChange}  // fungsi yang memproses perubahan
                  hasNoInitialSelection
                  >
                    {/* Add options here */}
                  </EuiSelect>
                </EuiFormRow>
                <EuiFormRow label="Name Appove">
                  <EuiFieldText 
                  name='approval'
                  placeholder='Approval Name'
                  value={nameApprv}
                  disabled />
                </EuiFormRow>
                <EuiFormRow label="HmKm">
                  <EuiFieldText 
                  name='hmkm'
                  placeholder='Input Hm Km'
                  onChange={(e)=> setHmkm(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Quantity Qouta">
                  <EuiFieldText 
                    name='qty'
                    placeholder='Input Quantity'
                    onChange={(e)=> setQty(e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Reason">
                  <EuiTextArea  
                   placeholder='Input Text'
                   onChange={(e)=> setReason(e.target.value)}
                   />
                </EuiFormRow>
                <EuiFormRow label="Upload Image">
                  <input
                    type="file"
                    onChange={onFileChange}
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

export default ModalForm;
