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
  EuiRadio,
  EuiSelect,
  useGeneratedHtmlId,
  EuiText,

} from '@elastic/eui';
import moment from 'moment';
import UserService from '../../services/UserService';
import EquipService from '../../services/EquiptmentService';
import formService from '../../services/formDashboard';
import { useParams } from 'react-router-dom';
import MainService from '../../services/HomeData';
const ModalFormAddIssued = () => {
  const id = useParams()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();
  const [selectedTime, setSelectedTime] = useState(moment());
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(moment());

  const user = JSON.parse(localStorage.getItem('user_data'))
  const dates = JSON.parse(localStorage.getItem('tanggal'))
  const [userData, setUserData] = useState([])
  const [equipData, setEquipData] = useState([])

  const [dataId, setDataId] = useState("")
  const [unitNo, setUnitNo] = useState("")
  const [model, setModel] = useState("")
  const [owner, setOwner] = useState("")
  const [hmStart, setHmStart] = useState("")
  const [hmLast, setHmLast] = useState("")
  const [qty, setQty] = useState(0)
  const [qtyLast, setQtyLast] = useState(0)
  const [flowStart, setFlowStart] = useState(0)
  const [flowEnd, setflowEnd] = useState(0)
  const [empId, setEmpId] = useState("")
  const [nameEmp, setNameEmp] = useState("")
  const [timeStart, setTimeStart] = useState(moment())
  const [timeEnd, setTimeEnd] = useState(moment())
  const [lkfId, setlkfId] = useState("")
  const [trxType, setTrxType] = useState("")
  const [fbr, setFbr] = useState(0)
  const [picture, setPicture] = useState("")
  const [sign, setSign] = useState("")
  const [date, setDate] = useState("")
  const [showError, setShowError] = useState(false);
  const [isSubmitResult, setIsSubmitResult] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('');
  const [submiStatus, setSubmitStatus] = useState(''); 
 
  const closeEditModal = () => {
    setIsEditResult(false)
    setIsConfirmEditStatus(false)
    Navigate("/form-data/:lkfId")
  }
  const [koutaLimit, setKoutaLimit] = useState('');
  const [isConfirmEditStatus, setIsConfirmEditStatus] = useState(false)
  const showConfirmEditModal = () => setIsConfirmEditStatus(true);
  const [resultStatus, setResultStatus] = useState(''); 
  const [qtyValue, setQtyValue] = useState("")
  const [editStatus, setEditStatus] = useState(''); 
  const [editMessage, setEditMessage] = useState('');
  const [isEditResult, setIsEditResult] = useState(false)
  const [hmkmValue, setHmkmValue] = useState("");
  const showEditModal = () => setIsEditResult(true);
 
  const closeConfirmEditModal = () => {
    setIsConfirmEditStatus(false)
    setIsModalVisible(false)
    
  }
  const [selectedUnit, setSelectedUnit] = useState("");
  const [isConfirmAddStatus, setIsConfirmAddStatus] = useState(false)
  const showConfirmAddModal = () => setIsConfirmAddStatus(true);

  const closeConfirmAddModal = () => {
    setIsConfirmAddStatus(false)
  }

  // Handle file selection
  const onFileChange = async(event) => {
    const file = event.target.files[0];
    try {
      const base64 = await convertToBase64(file);
      setPicture(base64);
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSignChange = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertToBase64(file);
    setSign(base64);
  };

  const handleSubmitData = async () => {
    try {
      const data = {
        from_data_id: dataId,
        no_unit: unitNo,
        model_unit: model,
        owner: owner,
        date_trx: new Date().toISOString(),
        hm_last: hmStart,
        hm_km: hmLast,
        qty_last: qtyLast,
        qty: qty,
        flow_start: flowStart,
        flow_end: flowEnd,
        jde_operator: empId,
        name_operator: nameEmp,
        start: timeStart,
        end: timeEnd,
        fbr: fbr,
        lkf_id: lkfId,
        signature: sign,
        type: trxType,
        photo: picture,
        created_by: user.JDE,
      };
  
      const res = await formService.insertData(data);
      if (res.status === 200|| res.status === "201") {  
        setEditStatus('Success');
        setEditMessage('Data successfully saved!');
        showEditModal(); 
      } else {
        throw new Error('Data not saved! Please try again.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      setEditStatus('Error');
      setEditMessage('Terjadi kesalahan saat update data. Data tidak tersimpan!');
      showEditModal(); 
    } finally {
      // closeModal(); 
      closeModal(); 
    }
  };
  

  const handleChageStart = (time) => {
    setSelectedTime(time);
    const formattedDates = moment(time).format('hh:mm:ss');
    setTimeStart(formattedDates)
  };

  const handleChangeEnd = (time) => {
    setSelectedTimeEnd(time);
    const formattedDates = moment(time).format('hh:mm:ss');
    setTimeEnd(formattedDates)
  };

  useEffect(() => {
    let dt = Math.floor(Date.now() / 1000);
    setDataId(dt)
    setlkfId(id.lkfId)
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




  useEffect(() => {
    const fetchUnitData = async () => {
      if (!selectedUnit) return;

      setLoading(true);
      setError(null);
      try {
        const response = await MainService.getDataPrevTR(selectedUnit);

        if (response.status === '200' && response.data.length > 0) {
          const latestUnitData = response.data.sort(
            (a, b) => new Date(b.date_trx) - new Date(a.date_trx)
          )[0];

          if (latestUnitData) {
            const hmKmValue = Number(latestUnitData.hm_km) || 0; 
            const hmKmLastValue = Number(latestUnitData.hm_last) || 0;
            setHmkmValue(hmKmValue);
            setHmLast(hmKmLastValue);
            setModel(latestUnitData.model_unit);
            setOwner(latestUnitData.owner);
            setQty(lastUnitData.qty || 0); 
            localStorage.setItem('latestUnitDataHMKM', JSON.stringify(latestUnitData));
          } else {
            setError('No data found');
          }
        } else {
          setError('No data found');
        }
      } catch (err) {
        setError('Failed to fetch unit data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUnitData();
  }, [selectedUnit]);
  

//   const handleUnitChange = async (e) => {
//     const val = String(e.target.value);
//     console.log('Selected unit number:', val);
    
//     try {
//         const itemSelected = await MainService.getDataPrevTR(val);
        
//         if (itemSelected && Array.isArray(itemSelected.data) && itemSelected.data.length > 0) {
//             const unitData = itemSelected.data[0]; // Access the first item if it exists
//             setUnitNo(val);
//             setModel(unitData.type);
//             setOwner(unitData.owner);
//             setHmkmValue(unitData.hm_km);
//             setHmLast(unitData.hm_last);
//             setQty(unitData.qty);
//             console.log('Fetched unit data:', unitData);
//         } else {
//             console.warn(`No previous transactions found for unit: ${val}`);
//             // Optionally show a message to the user
//             alert(`No previous transactions found for unit: ${val}`);
//             // Reset state when no data is found
//             setUnitNo('');
//             setModel('');
//             setOwner('');
//             setHmkmValue('');
//             setHmLast('');
//             setQty(0);
//         }
//     } catch (error) {
//         console.error('Error fetching unit data:', error.message);
//     }
// };

  
const handleUnitChange = (e) => {
  const val = String(e.target.value);
  setSelectedUnit(val);  // Set the selected unit
};

  const handleUserChange = (e) => {
    const val = String(e.target.value)
    const itemSelected = userData.find((item)=> item.JDE === val)
    if(itemSelected){
      setEmpId(itemSelected.JDE)
      setNameEmp(itemSelected.fullname)
    }
  }

  const handleOptionChange = (value) => {
    setTrxType(value);
  };

  // useEffect(() => {
  //   const fetchUnitPrev = async () => {
  //     try {
  //       const res = await formService.unitData(unitNo)
  //       if (res.status != 200) {
  //         throw new Error('Network response was not ok');
  //       }else if(res.status == 404){
  //         setEquipData([]);
  //       }else{
  //         setEquipData(res.data);
  //       }
  //     } catch (error) {
  //       console.log(error)
  //       // setError(error);
  //     } 
  //   };

  //   fetchUnitPrev()
  //   }, []);




  return (
    <>


    
      <EuiButton style={{background:"#00BFB3", color:"white"}}  onClick={showModal}>Add Data</EuiButton>
      {isModalVisible && (
        <EuiModal 
          aria-labelledby={modalTitleId}
          onClose={closeModal}
          initialFocus="[name=popswitch]"
        
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitleId}> Add Data</EuiModalHeaderTitle>
            <hr/>
          </EuiModalHeader>
          <EuiModalBody>
          <EuiForm id={modalFormId} component="form">
              <EuiFlexGrid columns={2}>
                <EuiFormRow label="No Unit">
                    <EuiSelect
                    options={equipData.map(items => ({
                      value: items.unit_no,  
                      text: items.unit_no  
                    }))}
                    value={unitNo}  
                    onChange={handleUnitChange} 
                    hasNoInitialSelection
                    >
                    </EuiSelect>
                </EuiFormRow>
                <EuiFormRow style={{marginTop:"0px"}} label="Model Unit">
                  <EuiFieldText 
                    name='model'
                    placeholder='Model Unit'
                    value={model}
                    disabled />
                </EuiFormRow>

                <EuiFormRow label="Owner">
                   <EuiFieldText 
                      name='owner'
                      placeholder='Input'
                      value={owner}
                      disabled
                    />
                </EuiFormRow>

                <div style={{display:"flex", gap:"15px", marginTop:"40px"}}>
                   <EuiRadio 
                    label="Issued"
                    id="Issued"
                    value="Issued"
                    checked={trxType === 'Issued'}
                    onChange={(e) => handleOptionChange('Issued')}
                    />
                     <EuiRadio 
                    id="receive"
                    label="Receive"
                    value="Receive"
                    checked={trxType === 'Receive'}
                    onChange={(e) => handleOptionChange('Receive')}
                    />
                     <EuiRadio 
                    id="transfer"
                    label="Transfer"
                    value="Transfer"
                    checked={trxType === 'Transfer'}
                    onChange={(e) => handleOptionChange('Transfer')}
                    />
                     <EuiRadio 
                    label="Receive KPC"
                    id="Receive kpc"
                    value="Receive KPC"
                    checked={trxType === 'Receive KPC'}
                    onChange={(e) => handleOptionChange('Receive KPC')}
                    />
                </div>
                  
                <EuiFormRow label="Qty" >
                  <EuiFieldText 
                  name='issued'
                  placeholder='Input'
                  value={qty}
                  onChange={(e)=> setQty(e.target.value)}
               />
                </EuiFormRow>

                <EuiFormRow label="Fuel Burn Rate(FBR)" style={{marginTop:"0px"}}>
                  <EuiFieldText 
                  name='fbr'
                  placeholder='Input'
                  value={fbr}
                  onChange={(e)=> setFbr(e.target.value)}
                />
                </EuiFormRow>

                <EuiFormRow label="HM/KM Terakhir Transaksi" style={{marginTop:"0px"}}>
                   <EuiFieldText 
                    name='hmkm'
                    placeholder='Input'
                    onChange={(e)=> setHmStart(e.target.value)}
                    value={hmkmValue || ""}
                  />
                </EuiFormRow>

                <EuiFormRow label="HM/KM Unit" style={{marginTop:"0px"}}>
                   <EuiFieldText 
                    name='hmkm_last'
                    onChange={(e)=> setHmLast(e.target.value)}
                  />
                </EuiFormRow>

                <EuiFormRow label="Flow Meter Awal" style={{marginTop:"0px"}}>
                   <EuiFieldText 
                    name='hmkm'
                    placeholder='Input'
                    onChange={(e)=> setFlowStart(e.target.value)}
                  />
                </EuiFormRow>

                <EuiFormRow label="Flow Meter Akhir" style={{marginTop:"0px"}}>
                   <EuiFieldText 
                    name='hmkm_last'
                    value={hmLast}
                    onChange={(e)=> setflowEnd(e.target.value)}
                    // disabled
                  />
                </EuiFormRow>

                <EuiFormRow label="Employee Id">
                    <EuiSelect
                    options={userData.map(items => ({
                      value: items.JDE,  
                      text: items.JDE  
                    }))}
                    value={empId}  
                    onChange={handleUserChange} 
                    hasNoInitialSelection
                    >
                    </EuiSelect>
                </EuiFormRow>
                <EuiFormRow label="Nama Operator/Driver">
                <EuiFieldText 
                  name='fullname'
                  placeholder='Input'
                  value={nameEmp}
                  disabled
                />
                </EuiFormRow>

                <EuiFormRow label="Jam Awal">
                    <EuiDatePicker
                      selected={selectedTime}
                      onChange={handleChageStart}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={1}
                      dateFormat="hh:mm "
                    />
                </EuiFormRow>

                <EuiFormRow label="Jam Akhir">
                    <EuiDatePicker
                      selected={selectedTimeEnd}
                      onChange={handleChangeEnd}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={1}
                      dateFormat="hh:mm "
                    />
                </EuiFormRow>

                <div>
                  <EuiFormRow label="Ambil Foto">
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
                <EuiFormRow label="Tanda Tangan">
                  <input
                    type="file"
                    onChange={onSignChange}
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
                document.getElementById(modalFormId)?.dispatchEvent(new Event('submit')); 
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
           
                showConfirmEditModal();
              }}
              fill
            >
              Save
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}

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
                {editStatus === 'Success!' ? 'Data berhasil terupdate.  Silahkan kembali untuk menambah data atau ke halaman utama. Data belum terupdate. Silahkan kembali untuk update data atau ke halaman utama.'
                : '  Data berhasil terupdate.'}
            </EuiText>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton onClick={closeEditModal} style={{ background: "#73A33F", color: "white" }}>
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
            {/* {resultMessage} */}
          </EuiText>
          <EuiText style={{
              fontSize: '15px',
              height: '25%',
              marginTop: '35px'
            }}>
              Apakah anda ingin menyimpan data  ?
          </EuiText>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButton onClick={handleSubmitData} style={{ background: "#73A33F", color: "white" }}>
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

export default ModalFormAddIssued;
