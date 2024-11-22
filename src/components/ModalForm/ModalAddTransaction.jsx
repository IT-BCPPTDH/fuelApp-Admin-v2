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
const ModalFormAddIssued = () => {
  const id = useParams()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();
  const [selectedTime, setSelectedTime] = useState(moment());
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(moment());
  const [options, setOptions] = useState([]);
  const [selectedTheOption, setSelectedTheOptions] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [picture, setPicture] = useState("")

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
  // const [selectedUnit, setSelectedUnit] = useState("");
  // const [isConfirmAddStatus, setIsConfirmAddStatus] = useState(false)
  // const showConfirmAddModal = () => setIsConfirmAddStatus(true);

  // const closeConfirmAddModal = () => {
  //   setIsConfirmAddStatus(false)
  // }

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

  const handleSubmitData = async () => {
    try {
      const data = {
        ...formData, created_by: user.JDE
      };
      console.log(data)
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
    const formattedDates = moment(time).format('hh:mm:ss');
    setFormData((prevFormData) => ({
      ...prevFormData,
      start: formattedDates,
    }));
    setSelectedTime(time)
  };

  const handleChangeEnd = (time) => {
    const formattedDates = moment(time).format('hh:mm:ss');
    setFormData((prevFormData) => ({
      ...prevFormData,
      end: formattedDates,
    }));
    
    setSelectedTimeEnd(time)
  };

  useEffect(() => {
    let dt = Math.floor(Date.now() / 1000);
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: dt,
      lkf_id: id.lkfId, 
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


  useEffect(() => {
    const dates = JSON.parse(localStorage.getItem('formattedDatesReq'))
    const fetchUnitData = async () => {
      if (!formData.no_unit) return;
      try {
        const response = await MainService.getDataPrevTR(formData.no_unit, dates);

        if (response.status === '200' && response.data.length > 0) {
          if(formData.type !== "" || formData.type == "Issued"){
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
            }));
          }
        } else {
          console.log("Data not found")
        }
      } catch (err) {
        // setError('Failed to fetch unit data');
        console.error(err);
      } finally {
        // setLoading(false);
      }
    };

    fetchUnitData();
  }, [formData.no_unit,formData.type]);

  
  const handleUserChange = (e) => {
    const val = String(e.target.value)
    const itemSelected = userData.find((item)=> item.JDE === val)
    if(itemSelected){
      setFormData((prevFormData) => ({
        ...prevFormData,
        jde_operator: itemSelected.JDE,
        name_operator: itemSelected.fullname,
      }));
    }
  }

  const handleOptionChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      type: value
    }));
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
          fbr: totalFbr,
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
        label: item.unit_no 
      }))
    );

  }, [equipData]);

  const handleUnitChange = (value) => {
    const selectedUnit = equipData.find((unit) => unit.unit_no === value);
    if (selectedUnit) {
      setFormData((prev) => ({
        ...prev,
        no_unit: selectedUnit.unit_no,
        model_unit: selectedUnit.type,
        owner: selectedUnit.owner,
      }));
    }else{
      setFormData((prev) => ({
        ...prev,
        model_unit: "",
        owner: "",
        hm_last: 0,
        qty_last: 0,
      }));
      setSelectedTheOptions([])
    }
  };

  const onSelectedChange = (selected) => {
    if (selected.length > 0) {
      const selectedValue = selected[0].label;
      handleUnitChange(selectedValue);
      setSelectedTheOptions(selected)
      setSearchMessage("");
    } else {
      handleUnitChange(""); 
      setSelectedTheOptions([])
    }
  };

  const onSearchChange = (searchValue) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();
    if (!normalizedSearchValue) {
      setSearchMessage(""); 
      return;
    }
    const found = options.some((option) =>
      option.label.toLowerCase().includes(normalizedSearchValue)
    );
    if (!found) {
      setSearchMessage("Data tidak ditemukan"); 
    } else {
      setSearchMessage(""); 
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
                <EuiFormRow label="No Unit">
                    <EuiComboBox 
                      aria-label="Accessible screen reader label"
                      placeholder="Select a unit..."
                      singleSelection={{ asPlainText: true }}
                      options={options}
                      selectedOptions={selectedTheOption}
                      onChange={onSelectedChange}
                      onSearchChange={onSearchChange}
                      customOptionText="Add {searchValue} as your occupation"
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

                <div style={{display:"flex", gap:"15px", marginTop:"40px"}}>
                   <EuiRadio 
                    label="Issued"
                    id="Issued"
                    value="Issued"
                    checked={formData.type === 'Issued'}
                    onChange={(e) => handleOptionChange('Issued')}
                    />
                     <EuiRadio 
                    id="receive"
                    label="Receive"
                    value="Receive"
                    checked={formData.type === 'Receipt'}
                    onChange={(e) => handleOptionChange('Receipt')}
                    />
                     <EuiRadio 
                    id="transfer"
                    label="Transfer"
                    value="Transfer"
                    checked={formData.type === 'Transfer'}
                    onChange={(e) => handleOptionChange('Transfer')}
                    />
                     <EuiRadio 
                    label="Receive KPC"
                    id="Receive kpc"
                    value="Receive KPC"
                    checked={formData.type === 'Receipt KPC'}
                    onChange={(e) => handleOptionChange('Receipt KPC')}
                    />
                </div>

                <EuiFormRow label="HM/KM Transaksi" style={{marginTop:"0px"}}>
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

                <EuiFormRow label="Qty" >
                  <EuiFieldText 
                  name='issued'
                  placeholder='Input'
                  onChange={(e) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      qty: e.target.value, 
                    }))
                  }
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

                <EuiFormRow label="Flow Meter Awal" style={{marginTop:"0px"}}>
                   <EuiFieldText 
                    name='hmkm'
                    placeholder='Input'
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        flow_start: e.target.value, 
                      }))
                    }
                    value={formData.flow_start} 
                  />
                </EuiFormRow>

                <EuiFormRow label="Flow Meter Akhir" style={{marginTop:"0px"}}>
                   <EuiFieldText 
                    name='flow_end'
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        flow_end: e.target.value, 
                      }))
                    }
                    value={formData.flow_end} 
                  />
                </EuiFormRow>

                <EuiFormRow label="Employee Id">
                    <EuiSelect
                    options={userData.map(items => ({
                      value: items.JDE,  
                      text: items.JDE  
                    }))}
                    value={formData.jde_operator}  
                    onChange={handleUserChange} 
                    hasNoInitialSelection
                    >
                    </EuiSelect>
                </EuiFormRow>
                <EuiFormRow label="Nama Operator/Driver">
                <EuiFieldText 
                  name='fullname'
                  placeholder='Input'
                  value={formData.name_operator}
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
                      dateFormat="HH:mm" 
                      timeFormat="HH:mm" 
                    />
                </EuiFormRow>

                <EuiFormRow label="Jam Akhir">
                    <EuiDatePicker
                      selected={selectedTimeEnd}
                      onChange={handleChangeEnd}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={1}
                      dateFormat="HH:mm" 
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
