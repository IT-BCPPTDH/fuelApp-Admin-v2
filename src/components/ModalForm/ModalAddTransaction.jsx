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
  EuiComboBox
} from '@elastic/eui';
import moment from 'moment';
import UserService from '../../services/UserService';
import EquipService from '../../services/EquiptmentService';
import formService from '../../services/formDashboard';
import { useParams } from 'react-router-dom';
import MainService from '../../services/HomeData';
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

const ModalFormAddIssued = () => {
  const id = useParams()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(null);
  const [options, setOptions] = useState([]);
  const [limitedSet, setLimitedSet] = useState(null)
  const [errors, setErrors] = useState({});
  const [trxDate, setTrxDate] = useState(null)

  const [flowsStart, setFlowsStart] = useState("")

  const user = JSON.parse(localStorage.getItem('user_data'))
  const [userData, setUserData] = useState([])
  const [equipData, setEquipData] = useState([])

  const [formData, setFormData] = useState({
    id: "",
    lkf_id: "",
    from_data_id: "",
    no_unit: "",
    model_unit: "",
    owner:  "",
    date_trx: "",
    qty: 0,
    qty_last: 0,
    fbr: 0,
    hm_last: 0,
    hm_km: 0,
    flow_start: 0,
    flow_end: 0,
    jde_operator: "",
    name_operator: "",
    start : "", 
    end:  "",
    photo:  null,
    signature:  null,
    type: ""
  });
 
  const closeEditModal = () => {
    // setIsEditResult(false)
    // setIsConfirmEditStatus(false)
    // Navigate("/form-data/:lkfId")
    window.location.reload()
  }

  const [isConfirmEditStatus, setIsConfirmEditStatus] = useState(false)
  const showConfirmEditModal = () => setIsConfirmEditStatus(true);
  const [resultStatus, setResultStatus] = useState(''); 
  const [editStatus, setEditStatus] = useState(''); 
  const [editMessage, setEditMessage] = useState('');
  const [isEditResult, setIsEditResult] = useState(false)
  const showEditModal = () => setIsEditResult(true);
 
  const closeConfirmEditModal = () => {
    setIsConfirmEditStatus(false)
    setIsModalVisible(false)
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
    if (!event.target.files || event.target.files.length === 0) {
      console.error("No file selected or input is invalid");
      return;
    }
    
    const file = event.target.files[0];
    try {
      const base64 = await convertToBase64(file);
      setFormData(prevData => ({
        ...prevData,
        photo: base64 
      }));
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  };

  const onSignChange = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertToBase64(file);
    setFormData(prevData => ({
      ...prevData,
      signature: base64 
    }));
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
    closeConfirmEditModal()
    const isValid =  handleValidation()
      if(!isValid){
        setIsModalVisible(true)
      }else{
        try {
          const data = {
            ...formData, created_by: user.JDE
          };
          const res = await formService.insertData(data);
          console.log(data)
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
          // closeModal(); 
        }
      }
  };
  
  const handleChageStart = (time) => {
    const formattedDates = moment(time).format("HH:mm:ss"); 
    setFormData((prevFormData) => ({
      ...prevFormData,
      start: formattedDates,
    }));
    setSelectedTime(time);
  };
  
  const handleChangeEnd = (time) => {
    const formattedEnd = moment(time).format("HH:mm:ss");
    
    setFormData((prevFormData) => {
      if (
        prevFormData.start && 
        moment(formattedEnd, "HH:mm:ss").isBefore(moment(prevFormData.start, "HH:mm:ss"))
      ) {
        setErrors({
          end: "Waktu selesai tidak boleh lebih kecil dari Waktu mulai!",
        });
        return prevFormData;
      }
  
      setErrors({
        end: "",
      });
  
      return {
        ...prevFormData,
        end: formattedEnd,
      };
    });
  
    setSelectedTimeEnd(time);
  };  

  useEffect(() => {
    let dt = Math.floor(Date.now() / 1000);
    setFormData((prevFormData) => ({
      ...prevFormData,
      from_data_id: dt,
      lkf_id: id.lkfId, 
      date_trx: trxDate
    }));
    
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

  const handleFMStart = (e) => {
    const val = e.target.value;
    const total = parseFloat(formData.qty) + parseFloat(val || 0)
    setFormData((prevFormData) => ({
      ...prevFormData,
      flow_start: val,
      flow_end: total
    }));
  }

  useEffect(() => {
    const dates = JSON.parse(localStorage.getItem('tanggal'))
    setTrxDate(dates)
    const flowsData = sessionStorage.getItem('dasboardTrx');
    const flows = flowsData ? JSON.parse(flowsData) : null;

    if (flows && flows.startMeter) {
      setFlowsStart(flows.startMeter);
    } else {
      console.warn('No startMeter found in flows or flows is null');
    }
    const fetchUnitData = async () => {
      if (!formData.no_unit) return;
      try {
        const response = await MainService.getDataPrevTR(formData.no_unit, dates);
        if (response.status === '200' && response.data.length > 0) {
          if(formData.type !== "" && formData.type == "Issued"){
            const newHmLast = response.data[0].hm_km || 0;
            const newQtyLast = response.data[0].qty || 0;

            setFormData((prev) => {
              if (prev.hm_last === newHmLast && prev.qty_last === newQtyLast) {
                return prev; 
              }

              return {
                ...prev,
                hm_last: newHmLast,
                qty_last: newQtyLast,
              };
            });
          }else{
            setFormData((prev) =>( {
              ...prev,
              hm_last: 0,
              qty_last: 0,
              fbr: 0
            }));
          }
        } else {
          console.log("Data not found")
        }
      } catch (err) {
        // setError('Failed to fetch unit data');
        console.error(err);
      } 
    };

    const fetchLimitedQuota = async () => {
      try {
        const response = await dailyQuotaService.getData({ option: "Daily", tanggal: dates });
        if (response.status === "200" && Array.isArray(response.data) && response.data.length > 0) {
          if (!formData.no_unit) return; 
          const limited = response.data.find((item) => item.unit_no === formData.no_unit);
          setLimitedSet(limited); 
        } else {
          setLimitedSet(null); 
        }
      } catch (err) {
        console.error("Error fetching limited quota:", err);
      }
    };

    fetchUnitData();
    fetchLimitedQuota()
  }, [formData.no_unit,formData.type]);

  
  const handleUserChange = (val) => {
    const itemSelected = userData.find((item) => item.JDE === val?.value);
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      jde_operator: itemSelected?.JDE || "",
      name_operator: itemSelected?.fullname || "",
    }));
  };
  

  const handleOptionChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      type: value
    }));
    const storedTrx = JSON.parse(sessionStorage.getItem('transaction'));
    const filteredData = storedTrx.filter(item => 
      item.type === "Transfer" || item.type === "Issued"
    );
    const lastData = filteredData.at(-1)
    if(lastData === undefined){
      setFormData((prevFormData) => ({
        ...prevFormData,
        flow_start: 0, 
      }))
    }else if(value == 'Issued' || value == 'Transfer'){
      setFormData((prevFormData) => ({
        ...prevFormData,
        flow_start: lastData.flow_end, 
      }))
    }else{
      setFormData((prevFormData) => ({
        ...prevFormData,
        flow_start: 0, 
      }))
    }
  };

  const handleHmKm = (e) => {
    const val = e.target.value; 
    const numericVal = parseFloat(val);
    
    if (!isNaN(numericVal) && numericVal !== 0 && val !== "") {
      const totalFbr = (numericVal - formData.hm_last) / formData.qty_last;
      
      if (formData.qty_last === 0) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          hm_km: numericVal,
          fbr: 0, 
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          hm_km: numericVal,
          fbr: totalFbr.toFixed(2),
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        fbr: 0,
      }));
    }
  };
  
  useEffect(() => {
    setOptions(
      equipData.map(item => ({
        label: item.unit_no,
        value:  item.unit_no,
      }))
    );

  }, [equipData]);

  const handleUnitChange = (val) => {
    if (!val) {
      setFormData((prev) => ({
        ...prev,
        no_unit: "",
        model_unit: "",
        owner: "",
        hm_last: 0,
        qty_last: 0,
      }));
      return;
    }
    const selectedUnit = equipData.find((unit) => unit.unit_no === val.value);
    setFormData((prev) => ({
      ...prev,
      no_unit: selectedUnit?.unit_no || "",
      model_unit: selectedUnit?.type || "",
      owner: selectedUnit?.owner || "",
      hm_last: selectedUnit ? prev.hm_last : 0,
      qty_last: selectedUnit ? prev.qty_last : 0,
    }));
  };
  
  const filterUnit = (option, inputValue) => {
    const searchValue = String(inputValue).toLowerCase();
    return (
      option.value.toLowerCase().includes(searchValue) 
    );
  };

  const filterEmployee = (option, inputValue) => {
    const searchValue = String(inputValue).toLowerCase();
    return (
      option.value.toLowerCase().includes(searchValue) 
    );
  };

  const handleQyt = (e) => {
    const val = e.target.value;
    if (
      formData.type !== "Issued" && 
      formData.type !== "Transfer" && 
      (!limitedSet || limitedSet.length === 0)
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        qty: val,
      }));
      setFormData((prevFormData) => ({
        ...prevFormData,
        flow_end: 0,
      }));
      return;
    }    
  
    if (!val) return;

    const jmlFlow = formData.flow_start + parseFloat(val)
  
    const total = parseFloat(val) + (limitedSet?.used || 0); 
    const totalLimited = (limitedSet?.quota || 0) + (limitedSet?.additional || 0);
  
    if (totalLimited === 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        qty: val,
        flow_end: jmlFlow
      }));
    } else if (total <= totalLimited) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        qty: val,
        flow_end: jmlFlow
      }));
      setErrors({ end: "" });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        qty: 0,
      }));
      setErrors({
        qty: "Kuota terisi melebihi batas yang telah ditentukan! Silahkan melakukan request quota.",
      });
    }
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
                <EuiFormRow label="No Unit" isInvalid={!!errors.no_unit} error={errors.no_unit}>
                  <CreatableSelect styles={customStyles} options={options}
                    filterOption={filterUnit} 
                    onChange={handleUnitChange}
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
                  <div style={{ display: "flex", gap: "15px", marginTop:"5px" }}>
                    <EuiRadio 
                      label="Issued"
                      id="Issued"
                      value="Issued"
                      checked={formData.type === 'Issued'}
                      onChange={() => handleOptionChange('Issued')}
                    />
                    <EuiRadio 
                      label="Receive"
                      id="Receive"
                      value="Receive"
                      checked={formData.type === 'Receipt'}
                      onChange={() => handleOptionChange('Receipt')}
                    />
                    <EuiRadio 
                      label="Transfer"
                      id="Transfer"
                      value="Transfer"
                      checked={formData.type === 'Transfer'}
                      onChange={() => handleOptionChange('Transfer')}
                    />
                    <EuiRadio 
                      label="KPC"
                      id="ReceiveKPC"
                      value="KPC"
                      checked={formData.type === 'Receipt KPC'}
                      onChange={() => handleOptionChange('Receipt KPC')}
                    />
                  </div>
                </EuiFormRow>

                <EuiFormRow label="HM/KM Transaksi" style={{marginTop:"0px"}} isInvalid={!!errors.hm_km} error={errors.hm_km}>
                   <EuiFieldText 
                    name='hmkm'
                    placeholder='Input'
                    onChange={handleHmKm}
                  />
                </EuiFormRow>

                <EuiFormRow label="HM/KM Transaksi Terakhir" style={{marginTop:"0px"}}>
                   <EuiFieldText 
                    name='hmkm_last'
                    value={formData.hm_last}
                    disabled
                  />
                </EuiFormRow>

                <EuiFormRow label="Qty" isInvalid={!!errors.qty} error={errors.qty}>
                  <EuiFieldText 
                  name='issued'
                  placeholder='Input'
                  onChange={handleQyt}
               />
                </EuiFormRow>

                <EuiFormRow label="Fuel Burn Rate(FBR)">
                  <EuiFieldText 
                  name='fbr'
                  placeholder='Input'
                  value={formData.fbr}
                  disabled
                />
                </EuiFormRow>

                <EuiFormRow label="Flow Meter Awal" style={{marginTop:"0px"}} isInvalid={!!errors.flow_start} error={errors.flow_start}>
                   <EuiFieldText 
                    name='hmkm'
                    placeholder='Input'
                    value={formData.flow_start}
                    onChange={handleFMStart}
                  />
                </EuiFormRow>

                <EuiFormRow label="Flow Meter Akhir" style={{marginTop:"0px"}} isInvalid={!!errors.flow_end} error={errors.flow_end}>
                   <EuiFieldText 
                    name='flow_end'
                    value={formData.flow_end}
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        flow_end: e.target.value, 
                      }))
                    }
                    placeholder='Input' 
                  />
                </EuiFormRow>

                <EuiFormRow label="Employee Id" isInvalid={!!errors.jde_operator} error={errors.jde_operator}>
                  <CreatableSelect styles={customStyles} 
                    options={userData.map(items => ({
                      label: items.JDE,  
                      value: items.JDE  
                    }))}
                    filterOption={filterEmployee} 
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
                      selected={selectedTime}
                      onChange={handleChageStart}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={1}
                      dateFormat="HH:mm" 
                      timeFormat="HH:mm" 
                      placeholderText="--:--"
                    />
                </EuiFormRow>

                <EuiFormRow label="Jam Akhir" isInvalid={!!errors.end} error={errors.end}>
                    <EuiDatePicker
                      selected={selectedTimeEnd}
                      onChange={handleChangeEnd}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={1}
                      dateFormat="HH:mm" 
                      timeFormat="HH:mm" 
                      placeholderText="--:--"
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
