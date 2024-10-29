
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
  EuiFilePicker,
  EuiButtonIcon,
  EuiText
} from '@elastic/eui';
import moment from 'moment';
import UserService from '../../services/UserService';
import EquipService from '../../services/EquiptmentService';
import FormData from '../../services/formDashboard';
import { Navigate, useParams } from 'react-router-dom';
import formService from '../../services/formDashboard';

const ModalFormDataEdit = ({row, onClose}) => {
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
    setIsConfirmEditStatus(false)
    Navigate("/form-data/:lkfId")
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


  const [formData, setFormData] = useState({
    from_data_id: row.from_data_id || "",
    no_unit: row.no_unit || "",
    model_unit: row.model_unit || "",
    owner: row.owner || "",
    date_trx: row.date_trx || "",
    qty: row.qty || "",
    fbr: row.fbr || "",
    hm_last: row.hm_last|| "",
    hm_km: row.hm_km|| "",
    flow_start: row.flow_start || "",
    flow_end: row.flow_end || "",
    jde_operator: row.jde_operator || "",
    name_operator: row.name_operator || "",
  });

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



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      const selectedUnit = equipData.find((unit) => unit.unit_no === e.target.value);
      if (selectedUnit) {
        setUnitNo(selectedUnit.unit_no); // Update the unitNo state
        setFormData((prev) => ({
          ...prev,
          no_unit: selectedUnit.unit_no,
          model_unit: selectedUnit.type,
          owner: selectedUnit.owner,
        }));
      }
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

  const handleSubmitData = async () => {
    try {
      const res = await formService.updateData({ id: row.id, ...formData });
      if (res.status === 200) {
        setEditStatus('Success');
        setEditMessage('Data successfully saved!');
      } else {
        throw new Error('Data not saved! Please try again.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      setEditStatus('Error');
      setEditMessage('Terjadi kesalahan saat update data. Data tidak tersimpan!');
    } finally {
      closeModal(); // Close the modal after submission
    }
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


  const calFbr = (hm_last, hm_km, qty) => {
    if (qty === 0) {
      return 0; // Prevent division by zero
    }
    return (hm_km - hm_last ) / qty;
  }

  useEffect(() => {
    const hm_last = parseFloat(formData.hm_last) || 0;
    const hm_km = parseFloat(formData.hm_km) || 0; 
    const qty = parseFloat(formData.qty) || 0; 
    const newFbr = calFbr(hm_last, hm_km, qty);
    setFbr(newFbr);
  }, [formData.hm_last, formData.hm_km, formData.qty]);

 
  
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
            <EuiModalHeaderTitle id={modalTitleId}> Edit Unit Transaksi</EuiModalHeaderTitle>
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
                    value={formData.no_unit}  
                    onChange={handleUnitChange} 
                    hasNoInitialSelection
                    >
                    </EuiSelect>
                </EuiFormRow>
                <EuiFormRow style={{marginTop:"0px"}} label="Model Unit">
                  <EuiFieldText 
                    name='model'
                    placeholder='Model Unit'
                    value={formData.model_unit}
                    disabled />
                </EuiFormRow>

                <EuiFormRow label="Owner">
                   <EuiFieldText 
                      name='owner'
                      placeholder='Input'
                      value={formData.owner}
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
                  placeholder='Input'
                  name='qty'
                  value={formData.qty}
                  onChange={handleChange}
               />
                </EuiFormRow>

                <EuiFormRow label="Fuel Burn Rate(FBR)" style={{marginTop:"0px"}}>
                  <EuiFieldText 
                  name='fbr'
                  placeholder='Input'
                  value={fbr}
                  // onChange={(e)=> setFbr(e.target.value)}
                  // onChange={handleChange}
                />
                </EuiFormRow>

                <EuiFormRow label="HM/KM Terakhir Transaksi" style={{marginTop:"0px"}}>
                   <EuiFieldText 
                    name='hm_last'
                    placeholder='Input'
                    value={formData.hm_last}
                    onChange={handleChange}
                  />
                </EuiFormRow>

                <EuiFormRow label="HM/KM Unit" style={{marginTop:"0px"}}>
                   <EuiFieldText 
                    name='hm_km'
                    value={formData.hm_km}
                    onChange={handleChange}
                  />
                </EuiFormRow>

                <EuiFormRow label="Flow Meter Awal" style={{marginTop:"0px"}}>
                   <EuiFieldText 
                    name='flow_start'
                    value={formData.flow_start}
                    placeholder='Input'
                    onChange={handleChange}
                  />
                </EuiFormRow>

                <EuiFormRow label="Flow Meter Akhir" style={{marginTop:"0px"}}>
                   <EuiFieldText 
                    name='flow_end'
                    value={formData.flow_end}
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
                showConfirmEditModal();
              
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

export default ModalFormDataEdit;