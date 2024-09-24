
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
  EuiFilePicker,
  EuiButtonIcon
} from '@elastic/eui';
import moment from 'moment';
import UserService from '../../services/UserService';
import EquipService from '../../services/EquiptmentService';
import FormData from '../../services/formDashboard';
import { useParams } from 'react-router-dom';

const ModalFormDataEdit = ({row}) => {
  console.log(row)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(moment());
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(moment());

  const user = JSON.parse(localStorage.getItem('user_data'))
  const dates = JSON.parse(localStorage.getItem('tanggal'))
  const [userData, setUserData] = useState([])
  const [equipData, setEquipData] = useState([])

  const [dataId, setDataId] = useState("")
  const [unitNo, setUnitNo] = useState(row.no_unit || "")
  const [model, setModel] = useState(row.model_unit || "")
  const [owner, setOwner] = useState(row.owner || "")
  const [hmStart, setHmStart] = useState(row.hm_last || "")
  const [hmLast, setHmLast] = useState(row.hm_km || "")
  const [qty, setQty] = useState(row.qty || 0)
  const [flowStart, setFlowStart] = useState(row.flow_start || 0)
  const [flowEnd, setflowEnd] = useState(row.flow_end || 0)
  const [empId, setEmpId] = useState(row.jde_operator || "")
  const [nameEmp, setNameEmp] = useState(row.name_operator || "")
  const [timeStart, setTimeStart] = useState(moment())
  const [timeEnd, setTimeEnd] = useState(moment())
  const [lkfId, setlkfId] = useState(row.lkf_id || "")
  const [trxType, setTrxType] = useState(row.type || "")
  const [fbr, setFbr] = useState(row.fbr || 0)
  const [picture, setPicture] = useState("")
  const [sign, setSign] = useState("")

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

  const onFileChange = async(event) => {
    const file = event.target.files[0];
    try {
      const base64 = await convertToBase64(file);
      setPicture(base64);
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  };

  const onSignChange = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertToBase64(file);
    setSign(base64);
  };

  const handleSubmitData = async () => {
    try {
      const data = {
        from_data_id : dataId,
        no_unit: unitNo,
        model_unit: model,
        owner: owner,
        date_trx: dates,
        hm_last: hmStart,
        hm_km: hmLast,
        qty_last: qtyLast,
        qty:qty,
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
        created_by: user.JDE
      }
      const res = await FormData.updateData(data)
      if (res.status === '201') {
        setSubmitStatus('Success!');
        setSubmitMessage('Data successfully saved!');
      } else {
        setEditStatus('Failed');
        setEditMessage('Data not saved!');
      }
    } catch (error) {
      setEditStatus('Error');
      setEditMessage('Terjadi kesalahan saat update data. Data tidak tersimpan!');
    } 
    finally {
      showEditModal();
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
    setlkfId(row.id)
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
      setUnitNo(e.target.value)
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

  const handleOptionChange = (value) => {
    setTrxType(value);
  };

  const handleDelete = async () => {
    try {
      const res = await FormData.delData(row.from_data_id);
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
            <EuiModalHeaderTitle id={modalTitleId}> Edit Unit Banlaws</EuiModalHeaderTitle>
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
                    value="issued"
                    checked={trxType === 'issued'}
                    onChange={(e) => handleOptionChange('issued')}
                    />
                     <EuiRadio 
                    id="receive"
                    label="Receive"
                    value="receive"
                    checked={trxType === 'receive'}
                    onChange={(e) => handleOptionChange('receive')}
                    />
                     <EuiRadio 
                    id="transfer"
                    label="Transfer"
                    value="transfer"
                    checked={trxType === 'transfer'}
                    onChange={(e) => handleOptionChange('transfer')}
                    />
                     <EuiRadio 
                    label="Receive KPC"
                    id="receive_kpc"
                    value="receive_kpc"
                    checked={trxType === 'receive_kpc'}
                    onChange={(e) => handleOptionChange('receive_kpc')}
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
                handleSubmitData();
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
        onClick={() => handleDelete()}
        title="Delete"
      />
     

      {isEditResult && (
        <EuiModal>
          <EuiModalBody>
            <EuiText style={{
                fontSize: '22px',
                height: '25%',
                marginTop: '25px',
                color: editStatus === 'success' ? '#D52424' : '#73A33F',
                fontWeight: '600',
              }}>
              {editMessage}
            </EuiText>
            <EuiText style={{
                fontSize: '15px',
                height: '25%',
                marginTop: '35px'
              }}>
                {editStatus === 'success' ? 'Data berhasil terupdate. Silahkan kembali untuk menambah data atau ke halaman utama.'
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
    </>
  );
};

export default ModalFormDataEdit;
