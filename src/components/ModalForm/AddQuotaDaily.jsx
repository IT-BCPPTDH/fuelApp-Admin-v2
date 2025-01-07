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
  EuiOverlayMask,
  EuiText
} from '@elastic/eui';
import moment from 'moment';
import masterElipseService from '../../services/masterElipse';
import CreatableSelect from "react-select/creatable";
import EquipService from '../../services/EquiptmentService';
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

const AddQuota = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const [equipData, setEquipData] = useState([])
  const modalTitleId = useGeneratedHtmlId();
  const [errorMessage, setErrorMessage] = useState(false)
  const [data, setData] = useState({
    date: null,
    unit_no: "",
    model: "",
    kategori: "",
    quota: ""
  })

  useEffect(() => {
    const dates = JSON.parse(localStorage.getItem('optionLimited')); 
    setData((prev) =>({
      ...prev,
      date: dates.tanggal
    }))
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
        } 
      };

    fetchUnit()
  }, [setData, setEquipData]);

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

  const handleSubmitData = async () => {
    try {
      const res = await dailyQuotaService.insertQuo(data)
      if (res.status === '200') {
        setSubmitStatus('Success!');
        setSubmitMessage('Data successfully saved!');
      } else {
        setSubmitStatus('Failed');
        setSubmitMessage(res.message);
      }
    } catch (error) {
      setSubmitStatus('Error');
      setSubmitMessage('Terjadi kesalahan saat update data. Data tidak tersimpan!');
    } finally {
        showSubmitModal();
    }
  };

  const filterUnit = (option, inputValue) => {
    const searchValue = String(inputValue).toLowerCase();
    return (
      option.value.toLowerCase().includes(searchValue) 
    );
  };

  const handleUnitChange = (val) => {
    if(val == null) {
        setData((prev)=> ({
            ...prev,
            model: ""
        }))
        return;
    }
    const itemSelected = equipData.find((units)=> units.unit_no === val?.value)
    if(itemSelected){
      setData((prev)=> ({
        ...prev,
        unit_no: val.value,
        model: itemSelected.brand
      }))
    }
  }

  return (
    <>
      <EuiButton style={{background:"#1B46D9", color:"white"}} iconType="plusInSquare" onClick={showModal}></EuiButton>
      {isModalVisible && (
        <EuiModal
          aria-labelledby={modalTitleId}
          onClose={closeModal}
          initialFocus="[name=popswitch]"
          style={{ width: "880px" }}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitleId}> Add New Data</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
          <EuiForm id={modalFormId} component="form">
              <EuiFlexGrid columns={2}>
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
                  onChange={handleUnitChange}
                  isSearchable
                  isClearable
                  />
                </EuiFormRow>
                <EuiFormRow style={{marginTop:"0px"}}label="Model Unit">
                  <EuiFieldText 
                  name='model'
                  placeholder='Model Unit'
                  value={data.model || ""}
                  disabled />
                </EuiFormRow>

                <EuiFormRow label="Kategori">
                  <EuiFieldText 
                  name='model'
                  placeholder='Input'
                  onChange={(e) => setData((prev)=>({
                    ...prev,
                    kategori: e.target.value
                  }))}
                  />
                </EuiFormRow>

                <EuiFormRow label="Limit kuota">
                  <EuiFieldText 
                  name='quota'
                  placeholder='Input'
                  onChange={(e) => setData((prev)=>({
                    ...prev,
                    quota: e.target.value
                  }))}
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
                const formElement = document.getElementById(modalFormId);
                if (formElement) {
                  formElement.dispatchEvent(new Event('submit')); 
                }
                closeModal();  
                showConfirmAddModal()
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
                color: submiStatus === 'Success!' ? '#73A33F' : '#D52424',
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
                : 'Data tidak terinput. Silahkan kembali untuk update data atau ke halaman utama.'}
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
            {submitMessage}
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

export default AddQuota;
