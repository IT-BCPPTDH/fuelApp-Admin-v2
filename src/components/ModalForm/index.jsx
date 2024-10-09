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
import dailyQuotaService from '../../services/dailyQuotaService';
import stationService from '../../services/stationDashboard';

const ModalForm = () => {
  const daily = [{id:1, shift: 'Day'}, {id:2, shift: 'Night'}]
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();
  const initialDate = moment().format('YYYY-MM-DD');
  const formattedTime = moment().format('HH:mm:ss');
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedTime, setSelectedTime] = useState(moment());

  const [tanggal, setTanggal] = useState(moment().format('YYYY-MM-DD'))
  const [Waktu, setWaktu] = useState(formattedTime || selectedTime)
  const [nomorUnit, setNomorUnit] = useState("")
  const [station, setStation] = useState("")
  const [shift, setShift] = useState('Day')
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
  const [stationData, setStationData] = useState([])
  const [errorMessage, setErrorMessage] = useState(false)

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
      if(!nomorUnit){
        setErrorMessage(true)
      }
      const res = await requestService.insertRequest(data)
      if (res.status === '201') {
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

  const validateData = () => {
    try {
      if(nomorUnit == "" || qty == ""){
        setErrorMessage(true)
      }else{
        showConfirmAddModal()
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const res = await EquipService.getEquip()
        const rest = await dailyQuotaService.getActiveData(tanggal)
        const newUnit = rest.data
          .filter(b => b.isActive) // hanya mengambil yang aktif
          .map(b => {
            const unitA = res.data.find(a => a.unit_no === b.unitNo); 
            return unitA ? { ...b, modelUnit: unitA.type} : null; 
          })
          .filter(c => c !== null); 

        if (res.status != 200) {
          throw new Error('Network response was not ok');
        }else if(newUnit.length == 0){
          setEquipData([]);
        }else{
          setEquipData(newUnit);
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

    const fetchStation = async () => {
      try {
        const res = await stationService.getStation()
        if (res.status != 200) {
          throw new Error('Network response was not ok');
        }else if(res.status == 404){
          setStationData([]);
        }else{
          setStationData(res.data);
        }
      } catch (error) {
        console.log(error)
      } 
    };
    fetchUnit()
    fetchUser()
    fetchStation()
  }, [tanggal]);


  const handleApprovalChange = (e) => {
    const val = String(e.target.value)
    const itemSelected = equipData.find((units)=> units.unitNo === val)
    if(itemSelected){
      setNomorUnit(val)
      setModel(itemSelected.modelUnit)
    }
  }

  const handleStationChange = (e) => {
    const val = String(e.target.value)
    setStation(val)
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
    setErrorMessage(false)
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
                <EuiFormRow label="Unit No"
                isInvalid={errorMessage}
                error={errorMessage ? 'Silahkan pilih unit lebih dahulu' : undefined}
                >
                  <EuiSelect
                   options={equipData.map(items => ({
                    value: items.unitNo,  
                    text: items.unitNo  
                  }))}
                  value={nomorUnit}  
                  onChange={handleApprovalChange}  
                  hasNoInitialSelection
                  >
                  </EuiSelect>
                </EuiFormRow>
                <EuiFormRow style={{marginTop:"0px"}}label="Station">
                <EuiSelect
                   options={stationData.map(items => ({
                    value: items.fuel_station_name,  
                    text: items.fuel_station_name  
                  }))}
                  value={station}  
                  onChange={handleStationChange}  
                  hasNoInitialSelection
                  >
                  </EuiSelect>
                </EuiFormRow>
                <EuiFormRow style={{marginTop:"0px"}}label="Model Unit">
                  <EuiFieldText 
                  name='model_unit'
                  placeholder='Model Unit'
                  value={model}
                  disabled />
                </EuiFormRow>
                <EuiFormRow style={{marginTop:"0px"}}label="Shift">
                <EuiSelect
                   options={daily.map(items => ({
                    value: items.shift,  
                    text: items.shift  
                  }))}
                  value={shift}  
                  onChange={(e)=>setShift(e.target.value)}  
                  hasNoInitialSelection
                  >
                  </EuiSelect>
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
                <EuiFormRow label="Quantity Qouta"
                isInvalid={errorMessage}
                error={errorMessage ? 'Silahkan isi jumlah quota lebih dahulu' : undefined}
                >
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
                document.getElementById(modalFormId)?.dispatchEvent(new Event('submit')); 
                validateData()
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
              color: submiStatus === 'Success!' ? '#73A33F' : '#D52424',
              fontWeight: '600',
            }}>
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
