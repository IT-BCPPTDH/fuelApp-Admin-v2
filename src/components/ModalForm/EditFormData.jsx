
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
  EuiComboBox,
  useGeneratedHtmlId,
  EuiButtonIcon,
  EuiText
} from '@elastic/eui';
import moment from 'moment';
import UserService from '../../services/UserService';
import EquipService from '../../services/EquiptmentService';
import FormData from '../../services/formDashboard';
import { Navigate, useParams } from 'react-router-dom';
import formService from '../../services/formDashboard';
import CreatableSelect from "react-select/creatable";
import dailyQuotaService from '../../services/dailyQuotaService';

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


const ModalFormDataEdit = ({row}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const user = JSON.parse(localStorage.getItem('user_data'))
  const dates = JSON.parse(localStorage.getItem('tanggal'))

  const [formData, setFormData] = useState({
    from_data_id: row.from_data_id || "",
    no_unit: row.no_unit || "",
    model_unit: row.model_unit || "",
    owner: row.owner || "",
    date_trx: row.date_trx || "",
    qty: row.qty || 0,
    fbr: row.fbr || 0,
    hm_last: row.hm_last|| 0,
    hm_km: row.hm_km|| 0,
    flow_start: row.flow_start || 0,
    flow_end: row.flow_end || 0,
    jde_operator: row.jde_operator || "",
    name_operator: row.name_operator || "",
    start : row.start || "", 
    end: row.end || "",
    photo: row.photo || "",
    signature: row.signature || "",
    type: row.type || ""
  });

  const [userData, setUserData] = useState([])
  const [equipData, setEquipData] = useState([])
  const [limitedSet, setLimitedSet] = useState({})
  const [imgUrl, setImgUrl] = useState([])
  const [signUrl, setSignUrl] = useState([])
  const [errors, setErrors] = useState({});
  const [optJde, setOptJde] = useState([])

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
    // setIsEditResult(false)
    // setIsConfirmEditStatus(false)
    // Navigate("/form-data/:lkfId")
    window.location.reload()
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

  const handleOptionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
     type: value
    }));
    setTrxType(value);
  };

  const handleValidation = () => {
    const newErrors = {};
  
    if (!formData.no_unit) newErrors.no_unit = "Unit number is required";
    if (!formData.type) newErrors.type = "type is required";
    if (!formData.hm_km) newErrors.hm_km = "Hmkm ID is required";
    if (!formData.qty) newErrors.qty = "Qty is required";
    if (!formData.flow_end) newErrors.flow_end = "Flow end is required";
    if (!formData.flow_start) newErrors.flow_start = "Flow Start is required";
    if (!formData.jde_operator) newErrors.jde_operator = "Jde operator is required";
    if (!formData.start) newErrors.start = "Start time is required";
    if (!formData.end) newErrors.end = "End time is required";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmitData = async () => {
    closeModal();
    const isValid =  handleValidation()
    if(!isValid){
      closeConfirmEditModal()
      setIsModalVisible(true)
    }else{
      try {
        const res = await formService.updateData({ id: row.id, ...formData, updated_by: user.JDE });
        if (res.status === "200") {
          setEditStatus('Success!');
          setEditMessage('Data successfully saved!');
        } else {
          throw new Error('Data not saved! Please try again.');
        }
      } catch (error) {
        console.error('Error updating data:', error);
        setEditStatus('Error');
        setEditMessage('Terjadi kesalahan saat update data. Data tidak tersimpan!');
      } finally {
        showEditModal(); 
      }
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
    if (hm_km === 0) {
      return 0;
    }
    return (hm_km - hm_last ) / qty;
  }

  useEffect(() => {
    const hm_last = parseFloat(formData.hm_last) || 0;
    const hm_km = parseFloat(formData.hm_km) || 0; 
    const qty = parseFloat(formData.qty) || 0; 
    const newFbr = calFbr(hm_last, hm_km, qty);
    setFormData((prev) => ({
      ...prev,
      fbr: newFbr
    }))
  }, [formData.hm_last, formData.hm_km, formData.qty]);


  useEffect(() => {
    setFormData({
      from_data_id: row.from_data_id || "",
      no_unit: row.no_unit || "",
      model_unit: row.model_unit || "",
      owner: row.owner || "",
      date_trx: row.date_trx || "",
      qty: row.qty || 0,
      fbr: row.fbr || 0,
      hm_last: row.hm_last|| 0,
      hm_km: row.hm_km|| 0,
      flow_start: row.flow_start || 0,
      flow_end: row.flow_end || 0,
      jde_operator: row.jde_operator || "",
      name_operator: row.name_operator || "",
      start : row.start ? moment(row.start, 'HH:mm:ss') : null,
      end: row.end ? moment(row.end, 'HH:mm:ss') : null,
      photo: row.photo || "",
      signature: row.signature || "",
      lkf_id: row.lkf_id || "",
      type: row.type || ""
    });
  }, [row]);

  
  useEffect(() => {
    setOptions(
      equipData.map(item => ({
        label: item.unit_no,
        value: item.unit_no
      }))
    );

    setOptJde(
      userData.map(items => ({
        label: items.JDE,  
        value: items.JDE  
      }))
    );
  
  }, [equipData, userData]);
  

  const filterUnit = (option, inputValue) => {
    const searchValue = String(inputValue).toLowerCase();
    return (
      option.value.toLowerCase().includes(searchValue) 
    );
  };

  const getSelectedUnit = (no_unit) => {
    if (!no_unit) return null; 
    const matchedUnit = equipData.find((unit) => unit.unit_no === no_unit);
    return matchedUnit ? { label: matchedUnit.unit_no, value: matchedUnit.unit_no } : null;
  };

  const handleUnitChange = (val) => {
    if (!val) {
      setFormData((prev) => ({
        ...prev,
        no_unit: "",
        model_unit: "",
        owner: "",
        // hm_last: 0,
        // qty_last: 0,
        // fbr: 0
      }));
      return;
    }
    const selectedUnit = equipData.find((unit) => unit.unit_no === val.value);
    setFormData((prev) => ({
      ...prev,
      no_unit: selectedUnit?.unit_no || "",
      model_unit: selectedUnit?.type || "",
      owner: selectedUnit?.owner || "",
      // hm_last: selectedUnit ? prev.hm_last : 0,
      // qty_last: selectedUnit ? prev.qty_last : 0,
      // fbr: selectedUnit ? prev.fbr : 0,
    }));
  };

  const handleCreateUnit = (inputValue) => {
    const newOption = { label: inputValue, value: inputValue };
    setOptions((prev) => [...prev, newOption]);
  };

  const handleUserChange = (val) => {
    const itemSelected = userData.find((item) => item.JDE === val?.value);
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      jde_operator: itemSelected?.JDE || "",
      name_operator: itemSelected?.fullname || "",
    }));
  };

  const filterEmployee = (option, inputValue) => {
    const searchValue = String(inputValue).toLowerCase();
    return option.value.toLowerCase().includes(searchValue);
  };

  const getSelectedJde = (jde) => {
    if (!jde) return null; 
    const matchedUnit = optJde.find((emp) => emp.value === jde);
    return matchedUnit || null;
  };

  const handleCreateEmployee = (inputValue) => {
    const newOption = { label: inputValue, value: inputValue };
    setOptJde((prev) => [...prev, newOption]);
  };

  const fetchImage = async (photo) => {
    if (imgUrl[photo]) return; 

    try {
      const response = await fetch(`${URL_API.generateImg}${photo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'image/png', 
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setImgUrl((prevUrls) => ({ ...prevUrls, [photo]: imageUrl }));
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const fetchSign = async (sign) => {
    if (signUrl[sign]) return; 

    try {
      const response = await fetch(`${URL_API.generateSign}${sign}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'image/png', 
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setSignUrl((prevUrls) => ({ ...prevUrls, [sign]: imageUrl }));
    } catch (error) {
      console.error('Error fetching image:', error);
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
            <EuiModalHeaderTitle id={modalTitleId}> Edit Unit Transaksi</EuiModalHeaderTitle>
          </EuiModalHeader>
            <EuiModalBody>
            <EuiForm id={modalFormId} component="form">
              <EuiFlexGrid columns={2}>
               <EuiFormRow label="No Unit" isInvalid={!!errors.no_unit} error={errors.no_unit}>
                 <CreatableSelect styles={customStyles} options={options}
                   value={getSelectedUnit(formData.no_unit)}
                   filterOption={filterUnit} 
                   onChange={handleUnitChange}
                   onCreateOption={handleCreateUnit}
                   isSearchable
                   isClearable
                 />
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

                <EuiFormRow 
                  label="Pilih Tipe" 
                  isInvalid={!!errors.type} 
                  error={errors.type}
                  style={{ marginTop: "20px" }}
                >

                  <div style={{display:"flex", gap:"15px", marginTop:"5px"}}>
                   <EuiRadio 
                    label="Issued"
                    id="issued"
                    value="issued"
                    checked={formData.type === 'Issued'}
                    onChange={(e) => handleOptionChange('Issued')}
                    />
                     <EuiRadio 
                    id="receive"
                    label="Receipt"
                    value="receive"
                    checked={formData.type === 'Receipt'}
                    onChange={(e) => handleOptionChange('Receipt')}
                    />
                    <EuiRadio 
                    id="transfer"
                    label="Transfer"
                    value="transfer"
                    checked={formData.type === 'Transfer'}
                    onChange={(e) => handleOptionChange('Transfer')}
                    />
                     <EuiRadio 
                    label="KPC"
                    id="receive_kpc"
                    value="receive_kpc"
                    checked={formData.type === 'Receipt KPC'}
                    onChange={(e) => handleOptionChange('Receipt KPC')}
                    />
                </div>

                </EuiFormRow>

                <EuiFormRow label="HM/KM Unit" style={{marginTop:"0px"}}>
                   <EuiFieldText 
                    name='hm_km'
                    value={formData.hm_km}
                    onChange={handleChange}
                  />
                </EuiFormRow>

                <EuiFormRow label="HM/KM Terakhir Transaksi" style={{marginTop:"0px"}} isInvalid={!!errors.hm_km} error={errors.hm_km}>
                   <EuiFieldText 
                    name='hm_last'
                    placeholder='Input'
                    value={formData.hm_last}
                    onChange={handleChange}
                    disabled
                  />
                </EuiFormRow>
                  
                <EuiFormRow label="Qty" isInvalid={!!errors.qty} error={errors.qty}>
                  <EuiFieldText 
                  placeholder='Input'
                  name='qty'
                  value={formData.qty}
                  onChange={handleChange}
               />
                </EuiFormRow>

                <EuiFormRow label="Fuel Burn Rate(FBR)" >
                  <EuiFieldText 
                  name='fbr'
                  placeholder='Input'
                  value={formData.fbr}
                  // onChange={(e)=> setFbr(e.target.value)}
                  // onChange={handleChange}
                  disabled
                />
                </EuiFormRow>

                <EuiFormRow label="Flow Meter Awal" style={{marginTop:"0px"}} isInvalid={!!errors.flow_start} error={errors.flow_start}>
                   <EuiFieldText 
                    name='flow_start'
                    value={formData.flow_start}
                    placeholder='Input'
                    onChange={handleChange}
                  />
                </EuiFormRow>

                <EuiFormRow label="Flow Meter Akhir" style={{marginTop:"0px"}} isInvalid={!!errors.flow_end} error={errors.flow_end}>
                   <EuiFieldText 
                    name='flow_end'
                    value={formData.flow_end}
                    onChange={(e)=> setflowEnd(e.target.value)}
                    disabled
                  />
                </EuiFormRow>

                <EuiFormRow label="Employee Id" isInvalid={!!errors.jde_operator} error={errors.jde_operator}>
                <CreatableSelect styles={customStyles} 
                    options={optJde}
                    filterOption={filterEmployee} 
                    value={getSelectedJde(formData.jde_operator)}
                    onCreateOption={handleCreateEmployee}
                    onChange={handleUserChange}
                    isSearchable
                    isClearable
                  />
                </EuiFormRow>

                <EuiFormRow label="Nama Operator/Driver">
                <EuiFieldText 
                  name='fullname'
                  placeholder='Input'
                  value={formData.name_operator}
                  disabled
                />
                </EuiFormRow>

                <EuiFormRow label="Jam Awal" isInvalid={!!errors.start} error={errors.start}>
                    <EuiDatePicker
                      selected={formData.start}
                      onChange={handleChageStart}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={1}
                      dateFormat="HH:mm" 
                      timeFormat="HH:mm" 
                    />
                </EuiFormRow>

                <EuiFormRow label="Jam Akhir" isInvalid={!!errors.end} error={errors.end}>
                    <EuiDatePicker
                      selected={formData.end}
                      onChange={handleChangeEnd}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={1}
                      dateFormat="HH:mm" // Format 24 jam
                      timeFormat="HH:mm" 
                    />
                </EuiFormRow>

                <div>
                  <EuiFormRow label="Ambil Foto">
                    <input type="file" accept="image/*" onChange={onFileChange} />
                  </EuiFormRow>
                  {formData.photo && (
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                      <img
                        src={formData.photo}
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
                
                <div>
                  <EuiFormRow label="Tanda Tangan">
                    <input type="file" accept="image/*" onChange={onSignChange} />
                  </EuiFormRow>
                  {formData.signature && (
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                      <img
                        src={formData.signature}
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
                color: editStatus === 'Success!' ? '#73A33F' :'#D52424' ,
                fontWeight: '600',
              }}>
              {editMessage}
            </EuiText>
            <EuiText style={{
                fontSize: '15px',
                height: '25%',
                marginTop: '35px'
              }}>
                {editStatus === 'Success!' ? 'Data berhasil terupdate.  Silahkan kembali untuk menambah data atau ke halaman utama.'
                : '  Data belum terupdate. Silahkan kembali untuk update data atau ke halaman utama.'}
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