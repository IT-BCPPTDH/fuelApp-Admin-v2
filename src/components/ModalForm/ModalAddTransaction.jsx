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
  EuiTextArea,
  useGeneratedHtmlId,
  EuiText,
  EuiFilePicker
} from '@elastic/eui';
import moment from 'moment';
import UserService from '../../services/UserService';
import EquipService from '../../services/EquiptmentService';
import { useParams } from 'react-router-dom';

const ModalFormAddIssued = () => {
  const id = useParams()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [startDate, setStartDate] = useState(moment());
  const [selectedTime, setSelectedTime] = useState(moment());
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(moment());
  const [selectedFile, setSelectedFile] = useState(null);

  const user = JSON.parse(localStorage.getItem('user_data'))
  const [userData, setUserData] = useState([])
  const [equipData, setEquipData] = useState([])

  const [dataId, setDataId] = useState("")
  const [unitNo, setUnitNo] = useState("")
  const [model, setModel] = useState("")
  const [owner, setOwner] = useState("")
  const [date, setDate] = useState("")
  const [hmStart, setHmStart] = useState("")
  const [hmLast, setHmLast] = useState("")
  const [qty, setQty] = useState(0)
  const [flowStart, setFlowStart] = useState(0)
  const [flowEnd, setflowEnd] = useState(0)
  const [empId, setEmpId] = useState("")
  const [nameEmp, setNameEmp] = useState("")
  const [timeStart, setTimeStart] = useState(moment())
  const [timeEnd, setTimeEnd] = useState(moment())
  const [lkfId, setlkfId] = useState("")
  const [trxType, setTrxType] = useState("")
  const [fuelmanId, setFuelmanId] = useState("")
  const [fbr, setFbr] = useState(0)

  const [isSubmitResult, setIsSubmitResult] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('');
  const [submiStatus, setSubmitStatus] = useState(''); 
  const showSubmitModal = () => setIsSubmitResult(true);
  const closeSubmitModal = () => {
    setIsSubmitResult(false)
    window.location.reload();
  }

  // Handle file selection
  const onFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmitData = async () => {
    try {
      const data = {
        from_data_id : dataId,
        no_unit: unitNo,
        model_unit: model,
        owner: owner,
        date_trx: date,
        hm_last: hmStart,
        hm_km: hmLast,
        qty_last,
        qty:qty,
        flow_start: flowStart,
        flow_end: flowEnd,
        dip_start,
        dip_end,
        sonding_start,
        sonding_end,
        jde_operator: empId,
        name_operator: nameEmp,
        start: timeStart,
        end: timeEnd,
        fbr,
        lkf_id: lkfId,
        signature,
        type: trxType,
        reference,
        photo,
        fuelman_id: fuelmanId,
        created_by: user.JDE
      };
      // const res = await requestService.insertRequest(data)
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

  const handleChageDate = (date) => {
    setSelectedDate(date);
    const formattedDates = moment(date).format('YYYY-MM-DD');
    setTanggal(formattedDates)
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
    setlkfId(id)
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

  const handleUnitChange = (e) => {
    const val = String(e.target.value)
    const itemSelected = equipData.find((units)=> units.unit_no === val)
    if(itemSelected){
      setUnitNo(val)
      setModel(itemSelected.type)
      setOwner(itemSelected.owner)
    }
  }

  const handleUserChange = (e) => {
    const val = String(e.target.value)
    const itemSelected = userData.find((item)=> item.JDE === val)
    if(itemSelected){
      setEmpId(itemSelected.JDE)
      setNameEmp(itemSelected.fullname)
    }
  }

  const handleOptionChange = (e) => {
    setTrxType(e.target.value); 
  };


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
                    id="issued"
                    value={trxType}
                    checked={trxType === 'issued'}
                    onChange={handleOptionChange}
                    />
                     <EuiRadio 
                    id="receive"
                    label="Receive"
                    value={trxType}
                    checked={trxType === 'receive'}
                    onChange={handleOptionChange}
                    />
                     <EuiRadio 
                    id="transfer"
                    label="Transfer"
                    value={trxType}
                    checked={trxType === 'transfer'}
                    onChange={handleOptionChange}
                    />
                     <EuiRadio 
                    label="Receive KPC"
                    id="receive"
                    value={trxType}
                    checked={trxType === 'receive_kpc'}
                    onChange={handleOptionChange}
                    />
                  </div>
                  
                <EuiFormRow label="Qty" >
                  <EuiFieldText 
                  name='issued'
                  placeholder='Input'
                  // value={qty}
                  onChange={(e)=> setQty(e.target.value)}
               />
                </EuiFormRow>

                <EuiFormRow label="Fuel Burn Rate(FBR)" style={{marginTop:"0px"}}>
                  <EuiFieldText 
                  name='issued'
                  placeholder='Input'
                  // value={qty}
                  onChange={(e)=> setFbr(e.target.value)}
                />
                </EuiFormRow>

                <EuiFormRow label="HM/KM Terakhir Transaksi" style={{marginTop:"0px"}}>
                   <EuiFieldText 
                    name='hmkm'
                    placeholder='Input'
                    onChange={(e)=> setHmStart(e.target.value)}
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
                    value={flowEnd}
                    onChange={(e)=> setflowEnd(e.target.value)}
                    disabled
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

                <EuiFormRow label="Ambil Foto">
                  <input
                    type="file"
                    onChange={onFileChange}
                  />
                </EuiFormRow>
                <EuiFormRow label="Tanda Tangan">
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
                handleSubmitData()
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
                  color: submiStatus === 'success' ? '#D52424' : '#73A33F',
                  fontWeight: '600',
                }}>
                {submitMessage}
              </EuiText>
              <EuiText style={{
                  fontSize: '15px',
                  height: '25%',
                  marginTop: '35px'
                }}>
                  {submiStatus === 'success' ? 'Data berhasil terupdate. Silahkan kembali untuk menambah data atau ke halaman utama.'
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
    </>
  );
};

export default ModalFormAddIssued;
