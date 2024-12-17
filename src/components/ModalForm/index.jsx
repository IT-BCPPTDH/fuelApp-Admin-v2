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
import CreatableSelect from "react-select/creatable";

const customStyles = {
  indicatorSeparator: (base) => ({
    ...base,
    width: "1px",          
    marginBottom: "12px",   
    marginTop:"0px"
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    marginBottom:  "10px",
  }),
  control: (base) => ({
    ...base,
    height: "30px", 
    margin: "0px"
  }),
  menu: (base) => ({
    ...base,
    fontSize: "14px",
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: "16px", 
    color: "#333", 
    marginBottom:"10px",
  }),
  placeholder: (base) => ({
    ...base,
    marginBottom:"10px",
    fontSize: "14px",
    color: "#aaa",
  }),
  clearIndicator: (base) => ({
    ...base,
    marginBottom:"10px",
  }),
  input: (provided) => ({
    ...provided,
    fontSize: '16px',
    marginBottom:"10px",
  }),
};

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
  const [errors, setErrors] = useState({});

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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onFileChange = async(event) => {
    const file = event.target.files[0];
    const base64 = await convertToBase64(file);
    setPicture(base64);
  };

  const handleSubmitData = async () => {
    const isValid =  handleValidation()
    if(!isValid){
      setIsModalVisible(true)
    }else{
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
        setSubmitStatus('Error');
        setSubmitMessage('Terjadi kesalahan saat update data. Data tidak tersimpan!');
      } finally {
        showSubmitModal();
      }
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
          .filter(b => b.is_active) 
          .map(b => {
            const unitA = res.data.find(a => a.unit_no === b.unit_no); 
            return unitA ? { ...b, model: unitA.type} : null; 
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
    // fetchStation()
  }, [tanggal]);

  const handleApprovalChange = (val) => {
    const itemSelected = equipData.find((units)=> units.unit_no === val?.value)
    if(itemSelected){
      setNomorUnit(val.value)
      setModel(itemSelected.model)
    }
  }

  const handleStationChange = (e) => {
    const val = String(e.target.value)
    setStation(val)
  }

  const handleUserChange = (val) => {
    const itemSelected = userData.find((item)=> item.JDE === val?.value)
    if(itemSelected){
      setidReq(itemSelected.JDE)
      setnameReq(itemSelected.fullname)
    }
  }

  const handleUserApproveChange = (val) => {
    const itemSelected = userData.find((item)=> item.JDE === val?.value)
    if(itemSelected){
      setidAprv(val.value)
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

  const filterUnit = (option, inputValue) => {
    const searchValue = String(inputValue).toLowerCase();
    return (
      option.value.toLowerCase().includes(searchValue) 
    );
  };

  const filterReq = (option, inputValue) => {
    const searchValue = String(inputValue).toLowerCase();
    return (
      option.value.toLowerCase().includes(searchValue) 
    );
  };

  const filterApprove = (option, inputValue) => {
    const searchValue = String(inputValue).toLowerCase();
    return (
      option.value.toLowerCase().includes(searchValue) 
    );
  };

  const handleValidation = () => {
    const newErrors = {};
  
    if (!nomorUnit) newErrors.nomorUnit = "Unit number is required";
    if (!shift) newErrors.shift = "Shift is required";
    if (!qty) newErrors.qty = "Qty ID is required";
    if (!idReq) newErrors.idReq = "Id request is required";
    if (!idAprv) newErrors.idAprv = "Id Approval end is required";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  return (
    <>
      <EuiButton style={{background:"#1B46D9", color:"white"}}  onClick={showModal}>Tambah Quota</EuiButton>
      {isModalVisible && (
        <EuiModal
          aria-labelledby={modalTitleId}
          onClose={closeModal}
          initialFocus="[name=popswitch]"
          style={{ width: "880px" }}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitleId}> Tambah Quota</EuiModalHeaderTitle>
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
                <EuiFormRow style={{marginTop:"20px"}}>
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
                <EuiFormRow label="Unit No"
                  isInvalid={errorMessage}
                  error={errorMessage ? 'Silahkan pilih unit lebih dahulu' : undefined}
                >
                  <CreatableSelect styles={customStyles} 
                   options={equipData.map(items => ({
                    label: items.unit_no,  
                    value: items.unit_no  
                  }))}
                  filterOption={filterUnit} 
                  onChange={handleApprovalChange}
                  isSearchable
                  isClearable
                  />
                </EuiFormRow>
                <EuiFormRow style={{marginTop:"20px"}}label="Model Unit">
                  <EuiFieldText 
                  name='model'
                  placeholder='Model Unit'
                  value={model}
                  disabled />
                </EuiFormRow>
                <EuiFormRow label="Id Request"
                isInvalid={errorMessage}
                error={errorMessage ? 'Silahkan pilih Id Request lebih dahulu' : undefined}
                >
                  <CreatableSelect styles={customStyles} 
                    options={userData.map(items => ({
                      label: items.JDE,  
                      value: items.JDE  
                    }))}
                    filterOption={filterReq} 
                    onChange={handleUserChange}
                    isSearchable
                    isClearable
                  />
                </EuiFormRow>
                <EuiFormRow label="Name of Requester">
                  <EuiFieldText 
                  name='request'
                  placeholder='Request Name'
                  value={nameReq}
                  disabled />
                </EuiFormRow>
                <EuiFormRow label="Id Approver"
                isInvalid={errorMessage}
                error={errorMessage ? 'Silahkan pilih Id Approval lebih dahulu' : undefined}>
                  <CreatableSelect styles={customStyles} 
                    options={userData.map(items => ({
                      label: items.JDE,  
                      value: items.JDE  
                    }))}
                    filterOption={filterApprove} 
                    onChange={handleUserApproveChange}
                    isSearchable
                    isClearable
                  />
                </EuiFormRow>
                <EuiFormRow label="Name of Approver">
                  <EuiFieldText 
                  name='approval'
                  placeholder='Approval Name'
                  value={nameApprv}
                  disabled />
                </EuiFormRow>
                <EuiFormRow label="Reason">
                  <EuiTextArea  
                   placeholder='Input Text'
                   onChange={(e)=> setReason(e.target.value)}
                   />
                </EuiFormRow>
                <EuiFormRow label="Quantity Quota"
                isInvalid={errorMessage}
                error={errorMessage ? 'Silahkan isi jumlah quota lebih dahulu' : undefined}
                >
                  <EuiFieldText 
                    name='qty'
                    placeholder='Input Quantity'
                    onChange={(e)=> setQty(e.target.value)}
                  />
                </EuiFormRow>
                <div>
                  <EuiFormRow label="Ambil Foto"
                  isInvalid={errorMessage}
                  error={errorMessage ? 'Silahkan masukkan file' : undefined}
                  >
                    <input type="file" accept="image/*" onChange={onFileChange} />
                  </EuiFormRow>
                  {picture && (
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                      <img
                        src={picture}
                        alt="Uploaded"
                        style={{
                          width: '250px',
                          height: '250px',
                          objectFit: 'cover',
                          border: '1px solid #ccc',
                          borderRadius: '10px',
                        }}
                      />
                    </div>
                  )}
                </div>             
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
                  color: submiStatus === 'Success!' ? '#73A33F' : '#D52424' ,
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
