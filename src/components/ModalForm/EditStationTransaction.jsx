import React, { useState, useEffect } from 'react';
import {
  EuiButton,
  EuiFieldText,
  EuiFlexGrid,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  useGeneratedHtmlId,
  EuiSelect,
  EuiButtonIcon,
  EuiCheckbox,
  EuiText,
  EuiDatePicker
} from '@elastic/eui';
import stationService from '../../services/stationDashboard';
import UserService from '../../services/UserService';
import moment from "moment";
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

const daysOpt = [
  { id:1, shift:'Day'},
  { id:2, shift:'Night'}
]

const EditStationTransaction = ({row}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userData, setUserData] = useState([])
    const [userName, setUserName] = useState("")
    const [userOpt, setUserOpt] = useState([])
    const [stationOpt, setStationOpt] = useState("")
    const [stationData, setStationData] = useState([])
    const [formData, setFormData] = useState({
      date: row.date || "",
      fuelman_id: row.fuelman_id || "",
      lkf_id: row.lkf_id || "",
      station: row.station || "",
      login_time: row.login_time || "",
      logout_time: row.logout_time || false,
      shift: row.shift || false,
      status: row.status || false,
    });
    const [errors, setErrors] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState(moment())

    const user = JSON.parse(localStorage.getItem('user_data'));
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

    useEffect(() => {
        setFormData({
            date: row.date || "",
            fuelman_id: row.fuelman_id || "",
            lkf_id: row.lkf_id || "",
            station: row.station || "",
            login_time: row.login_time || "",
            logout_time: row.logout_time || false,
            shift: row.shift || false,
            status: row.status || false,
        });
        if (row.date) {
          const formattedDate = moment(row.date, 'DD-MM-YYYY'); 
          setSelectedDate(formattedDate);
        } else {
          setSelectedDate(null); 
        }
    }, [row]);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await UserService.getAllUser()
          if (res.status != 200) {
            throw new Error('Network response was not ok');
          }else if(res.status == 404){
            setUserData([]);
          }else{
            const formattedData = res.data.map((item) => ({
              value: item.JDE,
              label: item.JDE,
            }));
            setUserData(res.data);
            setUserOpt(formattedData)
            const matchedItem = res.data.find((item) => String(formData.fuelman_id) === item.JDE);
            if (matchedItem) {
              setUserName(matchedItem.fullname);
            } else {
              setUserName("");
            }
          }
        } catch (error) {
          console.log(error)
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
            const formattedData = res.data.map((item) => ({
              value: item.fuel_station_name,
              label: item.fuel_station_name,
            }));
            setStationData(res.data);
            setStationOpt(formattedData)
          }
        } catch (error) {
          console.log(error)
        } 
      }
      fetchStation()
      fetchUser()
    }, []);

    const handleValidation = () => {
      const newErrors = {};
    
      if (!formData.date) newErrors.date = "Date is required";
      if (!formData.station) newErrors.station = "Station is required";
      if (!formData.fuelman_id) newErrors.fuelman_id = "Employee ID is required";
      if (!formData.shift) newErrors.shift = "Shift is required";
    
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; 
    };

    const handleChageDate = (date) => {
      setSelectedDate(date);
      setSelectedDate(date); 
      setFormData((prev) => ({
        ...prev,
        date: date ? moment(date).format("YYYY-MM-DD") : "", }));
    };

    const filterOptions = (option, inputValue) => {
      const searchValue = inputValue.toLowerCase();
      return (
        option.value.toLowerCase().includes(searchValue) 
      );
    };

    const handleCreate = (inputValue) => {
      const newOption = { value: inputValue, label: inputValue };
      setOptions((prev) => [...prev, newOption]);
      setSelectedOption(newOption);
    };

    const getSelectedOption = (fuelman_id) => {
      return userOpt.find(option => option.value === fuelman_id) || null;
    };

    const handleChange = (selectedOption) => {
      if (selectedOption) {
        setFormData({ ...formData, fuelman_id: selectedOption.value });
        const matchedItem = userData.find((item) => String(selectedOption.value) === item.JDE);
        if (matchedItem) {
          setUserName(matchedItem.fullname);
        } else {
          setUserName("");
        }
      } else {
        setFormData({ ...formData, fuelman_id: '' });
      }
    };

    const handleEditData = async () => {
      closeConfirmEditModal()
      const isValid =  handleValidation()
      if(!isValid){
        setIsModalVisible(true)
      }else{
        try {
          const updateList = (({ date, fuelman_id, lkf_id, station, shift }) => ({
              date: moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD'), 
              fuelman_id,
              lkf_id,
              station,
              shift,
            }))(formData);
            updateList.lkf_id = row.lkf_id; 
            const res = await stationService.editTrxStation(updateList);
            if (res.status === '200') {
                setEditStatus('Success!');
                setEditMessage('Data successfully saved!');
            } else {
                setEditStatus('Failed');
                setEditMessage('Data not saved!');
            }
          } catch (error) {
            setEditStatus('Error');
            setEditMessage('Terjadi kesalahan saat update data. Data tidak tersimpan!');
          } finally {
            showEditModal();
          }
      }
    };

    const filterStation = (option, inputValue) => {
      const searchValue = inputValue.toLowerCase();
      return (
        option.value.toLowerCase().includes(searchValue) 
      );
    };

    const handleCreateStation = (inputValue) => {
      const newOption = { value: inputValue, label: inputValue };
      setOptions((prev) => [...prev, newOption]);
      setSelectedOption(newOption);
    };

    const handleChangeStation = (selectedOption) => {
      if (selectedOption) {
        setFormData({ ...formData, station: selectedOption.value });
      } else {
        setFormData({ ...formData, station: '' });
      }
    };

    const getSelectedStation = (station) => {
      return stationOpt.find(option => option.value === station) || null;
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
                <EuiModalHeaderTitle id={modalTitleId}> Edit LKF No {formData.lkf_id}</EuiModalHeaderTitle>
              </EuiModalHeader>
              <EuiModalBody>
                <EuiForm id={modalFormId} component="form">
                  <EuiFlexGrid columns={2}>
                    <EuiFormRow label="Date" isInvalid={!!errors.date} error={errors.date}>
                      <EuiDatePicker
                        selected={selectedDate ? moment(selectedDate, 'DD-MM-YYYY') : null} 
                        onChange={handleChageDate}
                        dateFormat="DD/MM/YYYY"  
                        locale="en-gb" 
                      />
                    </EuiFormRow>
                    <EuiFormRow label="Stations" style={{marginTop:"0px"}} isInvalid={!!errors.station}
                      error={errors.station}>
                      <CreatableSelect styles={customStyles} options={stationOpt}
                        filterOption={filterStation} 
                        value={getSelectedStation(formData.station)}
                        onCreateOption={handleCreateStation}
                        onChange={handleChangeStation}
                        isSearchable
                        isClearable
                      />
                    </EuiFormRow>
                    <EuiFormRow  style={{marginTop:"0px"}} label="Employee Id"
                    isInvalid={!!errors.fuelman_id}
                    error={errors.fuelman_id}>
                      <CreatableSelect styles={customStyles} options={userOpt}
                        filterOption={filterOptions} 
                        value={getSelectedOption(formData.fuelman_id)}
                        onCreateOption={handleCreate}
                        onChange={handleChange}
                        isSearchable
                        isClearable
                      />
                    </EuiFormRow>
                    <EuiFormRow  style={{marginTop:"0px"}}label="Fullname">
                        <EuiFieldText 
                         name='fullname'
                         placeholder='Fullname'
                         value={userName}
                         disabled
                        />
                    </EuiFormRow>
                    <EuiFormRow  style={{marginTop:"0px"}}label="Shift"
                    isInvalid={!!errors.shift}
                    error={errors.shift}>
                        <EuiSelect
                          name="shift"
                          placeholder="Shift"
                          options={daysOpt.map((day) => ({
                            value: day.shift, 
                            text: day.shift, 
                          }))}
                          value={formData.shift || ''} 
                          onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                        />
                    </EuiFormRow>
                    <EuiFormRow  style={{marginTop:"0px"}}label="Status">
                        <EuiFieldText 
                         name='status'
                         placeholder='Status'
                         defaultValue={formData.status}
                        disabled
                        />
                    </EuiFormRow>
                    <EuiFormRow  style={{marginTop:"0px"}}label="Login Time">
                        <EuiFieldText 
                         name='login_time'
                         defaultValue={formData.login_time}
                         disabled
                        />
                    </EuiFormRow>
                    <EuiFormRow  style={{marginTop:"0px"}}label="Logout Time">
                        <EuiFieldText 
                         name='logout_time'
                         placeholder='Logout Time'
                         defaultValue={formData.logout_time}
                         disabled
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
                    showConfirmEditModal()
                  }}
                  fill
                >
                  Save
                </EuiButton>
              </EuiModalFooter>
            </EuiModal>
          )}
    
          {/* <EuiButtonIcon
            iconType="trash"
            aria-label="Delete"
            color="danger"
            // onClick={() => showConfirmModal()}
            title="Delete"
          /> */}
         
    
          {isEditResult && (
            <EuiModal>
              <EuiModalBody>
                <EuiText style={{
                    fontSize: '22px',
                    height: '25%',
                    marginTop: '25px',
                    color: editStatus === 'Success!' ? '#73A33F' : '#D52424' ,
                    fontWeight: '600',
                  }}>
                  {editMessage}
                </EuiText>
                <EuiText style={{
                    fontSize: '15px',
                    height: '25%',
                    marginTop: '35px'
                  }}>
                    {editStatus === 'Success!' ? 'Data berhasil terupdate. Silahkan kembali untuk menambah data atau ke halaman utama.'
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
              <EuiButton onClick={handleEditData} style={{ background: "#73A33F", color: "white" }}>
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

export default EditStationTransaction;