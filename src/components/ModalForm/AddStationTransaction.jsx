import React, { useState, useEffect } from 'react';
import {
  EuiButton,
  EuiFieldText,
  EuiFieldNumber,
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
  EuiRadioGroup,
  EuiTextArea,
  EuiDatePicker,
  EuiText
} from '@elastic/eui';
import stationService from '../../services/stationDashboard';
import UserService from '../../services/UserService';
import moment from "moment";
import CreatableSelect from "react-select/creatable";

// --- Gaya dan Opsi yang sudah ada ---
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
   { value: 'Day', label: 'Day' },
    { value: 'Night', label: 'Night' },
];

// Definisikan state awal untuk form di luar komponen agar lebih rapi
const initialFormData = {
  date: moment(), 
  shift: '',
  hm_start: 0,
  hm_end: 0,
  site: '',
  fuelman_id: '',
  station: '',
  opening_dip: 0,
  opening_sonding: 0,
  closing_dip: 0,
  closing_sonding: 0,
  close_data: 0,
  variant: 0,
  flow_meter_start: 0,
  flow_meter_end: 0,
  status: 'opening', 
  time_opening: '',
  notes: ''
};

const AddStationTransaction = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    // --- State yang sudah ada untuk data & modal (tidak diubah) ---
    const [userData, setUserData] = useState([]);
    const [userOpt, setUserOpt] = useState([]);
    const [userName, setUserName] = useState("");
    const [stationOpt, setStationOpt] = useState([]);
    const [stationData, setStationData] = useState([]);
    const [isResultModalVisible, setIsResultModalVisible] = useState(false);
    const [resultMessage, setResultMessage] = useState('');
    const [resultStatus, setResultStatus] = useState('');
    const [isConfirmEditStatus, setIsConfirmEditStatus] = useState(false);
    
    // --- ID dan fungsi modal yang sudah ada ---
    const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
    const modalTitleId = useGeneratedHtmlId();

    const openModal = () => {
      setFormData(initialFormData); // Reset form setiap kali modal dibuka
      setErrors({});
      setIsModalVisible(true);
    };

    const closeModal = () => setIsModalVisible(false);
    const closeResultModal = () => {
      setIsResultModalVisible(false);
      window.location.reload();
    };
    const showConfirmEditModal = () => setIsConfirmEditStatus(true);
    const closeConfirmEditModal = () => setIsConfirmEditStatus(false);

    // Opsi untuk Radio Button Status
    const statusOptions = [
      { id: 'opening', label: 'Opening' },
      { id: 'closing', label: 'Closing' },
    ];

    const siteOptions = [
    { value: 'BCP', label: 'BCP' },
    { value: 'ACP', label: 'ACP' },
  ];

    // Fetch data untuk user dan station (tidak diubah)
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

    // Handler umum untuk input text, number, dan select
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handler khusus untuk CreatableSelect (User & Station)
    const handleSelectChange = (name, selectedOption) => {
      const value = selectedOption ? selectedOption.value : '';
      setFormData(prev => ({ ...prev, [name]: value }));

      if (name === 'fuelman_id') {
        const matchedItem = userData.find(item => item.JDE === String(value));
        setUserName(matchedItem ? matchedItem.fullname : "");
      }
    };
    
    // Handler untuk DatePicker
    const handleDateChange = (name, date) => {
      setFormData(prev => ({ ...prev, [name]: date }));
    };

    // Validasi form dinamis berdasarkan status
    const handleValidation = () => {
      const newErrors = {};
      const { status, date, shift, fuelman_id, station, hm_start, opening_dip, opening_sonding, flow_meter_start } = formData;
      
      // Validasi field yang selalu ada
      if (!date) newErrors.date = "Date is required";
      if (!shift) newErrors.shift = "Shift is required";
      if (!fuelman_id) newErrors.fuelman_id = "Employee ID is required";
      if (!station) newErrors.station = "Station is required";

      // Validasi untuk status 'opening'
      if (status === 'opening') {
        if (!hm_start) newErrors.hm_start = "HM Start is required";
        if (!opening_dip) newErrors.opening_dip = "Opening Dip is required";
        if (!opening_sonding) newErrors.opening_sonding = "Opening Sonding is required";
        if (!flow_meter_start) newErrors.flow_meter_start = "Flow Meter Start is required";
      }

      // Validasi untuk status 'closing' (mencakup semua field opening + field closing)
      if (status === 'closing') {
        const { hm_end, closing_dip, closing_sonding, flow_meter_end, close_data } = formData;
        if (!hm_start) newErrors.hm_start = "HM Start is required";
        if (!opening_dip) newErrors.opening_dip = "Opening Dip is required";
        if (!opening_sonding) newErrors.opening_sonding = "Opening Sonding is required";
        if (!flow_meter_start) newErrors.flow_meter_start = "Flow Meter Start is required";
        if (!hm_end) newErrors.hm_end = "HM End is required";
        if (!closing_dip) newErrors.closing_dip = "Closing Dip is required";
        if (!closing_sonding) newErrors.closing_sonding = "Closing Sonding is required";
        if (!flow_meter_end) newErrors.flow_meter_end = "Flow Meter End is required";
        if (!close_data) newErrors.close_data = "Close Data  is required";
      }
    
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; 
    };

    const handleSave = async () => {
      closeConfirmEditModal();
      if (!handleValidation()) {
        return; // Hentikan proses jika validasi gagal
      }
      let dt =  Math.floor(Date.now() / 1000);
      const user = JSON.parse(localStorage.getItem('user_data'))
      // Format data sebelum dikirim
      const payload = {
        ...formData,
        lkf_id: dt,
        date: moment(formData.date).format("YYYY-MM-DD"),
        created_by: user.JDE
      };

      try {
        console.log(payload)
        // Ganti dengan service yang sesuai untuk menyimpan data baru
        const res = await stationService.addTrxStation(payload); 
        if (res.status === "200" ) {
            setResultStatus('Success!');
            setResultMessage('Data successfully saved!');
        } else {
            setResultStatus('Failed');
            setResultMessage('Data not saved!');
        }
      } catch (error) {
        console.error("Error saving data:", error);
        setResultStatus('Error');
        setResultMessage('An error occurred while saving data.');
      } finally {
        setIsResultModalVisible(true);
        closeModal();
      }
    };

    // Helper untuk mendapatkan value dari CreatableSelect
    const getSelectedOption = (options, value) => options.find(option => option.value === value) || null;

    return (
        <>
          <EuiButton style={{background:"#1B46D9", color:"white"}} iconType="plusInSquare" onClick={openModal}>Add Data</EuiButton>
          
          {isModalVisible && (
            <EuiModal
              onClose={closeModal}
              initialFocus="[name=status]"
              style={{ width: "880px" }}
            >
              <EuiModalHeader>
                <EuiModalHeaderTitle id={modalTitleId}>Add Station Transaction</EuiModalHeaderTitle>
              </EuiModalHeader>
              <EuiModalBody>
                <EuiForm id={modalFormId} component="form">
                  <EuiFormRow >
                    <EuiRadioGroup
                      options={statusOptions}
                      idSelected={formData.status}
                      onChange={(id) => setFormData(prev => ({ ...prev, status: id }))}
                      name="status"
                      legend={{ children: 'Transaction status' }}
                    />
                  </EuiFormRow>

                  <EuiFlexGrid columns={2}>
                    <EuiFormRow label="Date" isInvalid={!!errors.date} error={errors.date}>
                      <EuiDatePicker
                        selected={formData.date} 
                        onChange={(date) => handleDateChange('date', date)}
                        dateFormat="DD/MM/YYYY"
                        // maxDate={moment()}
                      />
                    </EuiFormRow>
                    <EuiFormRow label="Shift" isInvalid={!!errors.shift} error={errors.shift} style={{marginTop:"0px"}}>
                       <CreatableSelect 
                        styles={customStyles} 
                        options={daysOpt}
                        value={getSelectedOption(daysOpt, formData.shift)}
                        onChange={(option) => handleSelectChange('shift', option)}
                        isSearchable isClearable
                      />
                    </EuiFormRow>
            
                    <EuiFormRow label="Station" isInvalid={!!errors.station} error={errors.station}>
                      <CreatableSelect 
                        styles={customStyles} 
                        options={stationOpt}
                        value={getSelectedOption(stationOpt, formData.station)}
                        onChange={(option) => handleSelectChange('station', option)}
                        isSearchable isClearable
                      />
                    </EuiFormRow>
                     <EuiFormRow label="Site">
                      <CreatableSelect 
                        styles={customStyles} 
                        options={siteOptions}
                        value={getSelectedOption(siteOptions, formData.site)}
                        onChange={(option) => handleSelectChange('site', option)}
                        isSearchable isClearable
                      />
                        {/* <EuiFieldText name="site" value={formData.site} onChange={handleInputChange} /> */}
                      </EuiFormRow>
                    <EuiFormRow label="Employee ID" isInvalid={!!errors.fuelman_id} error={errors.fuelman_id}>
                       <CreatableSelect 
                        styles={customStyles} 
                        options={userOpt}
                        value={getSelectedOption(userOpt, formData.fuelman_id)}
                        onChange={(option) => handleSelectChange('fuelman_id', option)}
                        isSearchable isClearable
                      />
                    </EuiFormRow>
                    <EuiFormRow label="Fullname">
                      <EuiFieldText value={userName} disabled />
                    </EuiFormRow>

                    {/* --- Field untuk Opening & Closing --- */}
                    <EuiFormRow label="HM Start" isInvalid={!!errors.hm_start} error={errors.hm_start}>
                      <EuiFieldNumber name="hm_start" value={formData.hm_start} onChange={handleInputChange} />
                    </EuiFormRow>
                    <EuiFormRow label="Flow Meter Start" isInvalid={!!errors.flow_meter_start} error={errors.flow_meter_start}>
                      <EuiFieldNumber name="flow_meter_start" value={formData.flow_meter_start} onChange={handleInputChange} />
                    </EuiFormRow>
                    <EuiFormRow label="Opening DIP" isInvalid={!!errors.opening_dip} error={errors.opening_dip}>
                      <EuiFieldNumber name="opening_dip" value={formData.opening_dip} onChange={handleInputChange} />
                    </EuiFormRow>
                    <EuiFormRow label="Opening Sonding" isInvalid={!!errors.opening_sonding} error={errors.opening_sonding}>
                      <EuiFieldNumber name="opening_sonding" value={formData.opening_sonding} onChange={handleInputChange} />
                    </EuiFormRow>
                    <EuiFormRow label="Time Opening">
                      <EuiDatePicker
                        selected={formData.time_opening ? moment(formData.time_opening) : null}
                        onChange={(date) => handleDateChange('time_opening', date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="DD/MM/YYYY HH:mm"
                        placeholder="Select date and time"
                      />
                    </EuiFormRow>
                    
                    {/* --- Field KHUSUS untuk Closing --- */}
                    {formData.status === 'closing' && (
                      <>
                        <EuiFormRow label="HM End" isInvalid={!!errors.hm_end} error={errors.hm_end}>
                          <EuiFieldNumber name="hm_end" value={formData.hm_end} onChange={handleInputChange} />
                        </EuiFormRow>
                        <EuiFormRow label="Flow Meter End" isInvalid={!!errors.flow_meter_end} error={errors.flow_meter_end}>
                          <EuiFieldNumber name="flow_meter_end" value={formData.flow_meter_end} onChange={handleInputChange} />
                        </EuiFormRow>
                        <EuiFormRow label="Closing DIP" isInvalid={!!errors.closing_dip} error={errors.closing_dip}>
                          <EuiFieldNumber name="closing_dip" value={formData.closing_dip} onChange={handleInputChange} />
                        </EuiFormRow>
                        <EuiFormRow label="Closing Sonding" isInvalid={!!errors.closing_sonding} error={errors.closing_sonding}>
                          <EuiFieldNumber name="closing_sonding" value={formData.closing_sonding} onChange={handleInputChange} />
                        </EuiFormRow>
                        <EuiFormRow label="Variant">
                          <EuiFieldText name="variant" value={formData.variant} onChange={handleInputChange} />
                        </EuiFormRow>
                        <EuiFormRow label="Close Data" >
                          <EuiFieldText name="close_data" isInvalid={!!errors.close_data} error={errors.close_data} onChange={handleInputChange} />
                        </EuiFormRow>
                      </>
                    )}
                  </EuiFlexGrid>
                  
                  <EuiFormRow label="Notes" fullWidth style={{marginTop:"20px"}}>
                    <EuiTextArea name="notes" value={formData.notes} onChange={handleInputChange} fullWidth />
                  </EuiFormRow>

                </EuiForm>
              </EuiModalBody>
              <EuiModalFooter>
                <EuiButton onClick={closeModal} 
                style={{
                    background: "White",
                    color: "#73A33F",
                    width: "100px",
                  }}
                fill>Cancel</EuiButton>
                <EuiButton style={{
                    background: "#73A33F",
                    color: "white",
                    width: "100px",
                  }}
                   onClick={showConfirmEditModal} fill
                   >Save</EuiButton>
              </EuiModalFooter>
            </EuiModal>
          )}
    
          {/* --- Modal Konfirmasi dan Hasil (tidak diubah) --- */}
          {isConfirmEditStatus && (
            <EuiModal onClose={closeConfirmEditModal}>
              <EuiModalBody>
                <EuiText><h4>Apakah Anda yakin ingin menyimpan data?</h4></EuiText>
              </EuiModalBody>
              <EuiModalFooter>
                <EuiButton onClick={closeConfirmEditModal} color="danger">Tutup</EuiButton>
                <EuiButton onClick={handleSave} color="primary" fill>Ya, Simpan</EuiButton>
              </EuiModalFooter>
            </EuiModal>
          )}

          {isResultModalVisible && (
            <EuiModal onClose={closeResultModal}>
              <EuiModalHeader>
                  <EuiModalHeaderTitle>{resultStatus}</EuiModalHeaderTitle>
              </EuiModalHeader>
              <EuiModalBody>
                  <EuiText>{resultMessage}</EuiText>
              </EuiModalBody>
              <EuiModalFooter>
                  <EuiButton onClick={closeResultModal} color="primary" fill>Tutup</EuiButton>
              </EuiModalFooter>
            </EuiModal>
          )}
        </>
    );
};

export default AddStationTransaction;