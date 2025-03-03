import React, { useState } from 'react';
import {
    EuiButton,
    EuiModal,
    EuiModalBody,
    EuiModalFooter,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiText,
    useGeneratedHtmlId,
    EuiIcon
} from '@elastic/eui';
import { URL_API } from '../../utils/Enums';
import bulkMasterData from '../../services/bulkMasterData';


const ModalBulkUnit = () => {
    const modalTitleId = useGeneratedHtmlId();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const closeModal = () => setIsModalVisible(false);
    const showModal = () => setIsModalVisible(true);
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const [isSubmitResult, setIsSubmitResult] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('');
    const [submitMessage1, setSubmitMessage1] = useState([]);
    const [submitMessage2, setSubmitMessage2] = useState(0);
    const [submiStatus, setSubmitStatus] = useState(''); 
    const showSubmitModal = () => setIsSubmitResult(true);
    const closeSubmitModal = () => {
      setIsSubmitResult(false)
      window.location.reload();
    }

    const onFileChange = (event) => {
      const selectedFile = event.target.files[0];
    
      if (selectedFile) {
        if (selectedFile.name.endsWith('.xlsx')) {
          setFile(selectedFile);
          setErrorMessage(''); 
        } else {
          setFile(null);
          setErrorMessage('File harus Excel!');
        }
      } else {
        setFile(null);
        setErrorMessage('File tidak ditemukan');
      }
    };
      
    const handleImport = async() => {
      const formData = new FormData()
      try {
        formData.append('file',file)
        const user = JSON.parse(localStorage.getItem('user_data'))
        const creation_by = user.JDE
        formData.append("creation_by", creation_by);
        const response = await bulkMasterData.bulkUnit(formData);
        if (response.status === 200) { 
          closeModal(); 
          setSubmitStatus('Success!');
          setSubmitMessage('Data successfully saved!');
        } else {
          setSubmitStatus('Failed');
          setSubmitMessage('Data not saved!');
          setSubmitMessage1(response.error)
        }
      } catch (error) {
        setSubmitStatus('error');
        setSubmitMessage(error.message);
      }finally {
        showSubmitModal();
      }
  };

  const handleDownloadTemplate = () => {
    const template = 'mdUnit_template.xlsx'
    window.location.href = URL_API.generateTemplate + template
  };

  return (
    <>
    <EuiButton style={{ background: "#0077CC", color: "white" }} color="primary"  onClick={showModal}>Upload Data</EuiButton>
      {isModalVisible && (
       <EuiModal 
           aria-labelledby={modalTitleId}
           onClose={closeModal}
           initialFocus="[name=popswitch]"
        
        >
          <EuiModalHeader style={{ background: "#e4e4e4", color: "white" }}>
            <EuiModalHeaderTitle>
              Upload Data
            </EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>
            <div  style={{ backgroundColor: '#4f726b', padding: '10px', borderRadius: '5px', marginTop:'30px' }}>
            {/* <EuiIcon type="warningFilled" size="m" style={{ marginRight: '10px' }} /> */}
              <strong style={{ color: '#ffffff'}}>Kolom ini untuk mengupload data yang tidak ada pada system.</strong>
              <p style={{ color: '#ffffff'}}>Pastikan anda mengupload menggunakan template file excel dibawah ini.</p>
            </div>
            <div style={{ margin: '15px 0' }}>
              <EuiText>
                <p>
                  Download template di sini{' '}
                  <span
                    onClick={handleDownloadTemplate}
                    style={{ color: '#0073e6', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Template Upload
                  </span>
                </p>
              </EuiText>
            </div>
            <div style={{ position: 'relative', marginTop: '10px' }}>
              <input
                type="file"
                onChange={onFileChange}
                style={{
                  position: 'absolute',
                  opacity: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                }}
              />
              {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
              <button
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  backgroundColor: '#f5f5f5',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {file ? file.name : 'Choose File'}
              </button>
            </div>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButton onClick={closeModal} 
            fill={false}
            style={{
                background: "#717171",
                color: "white",
                width: "100px",
              }}
            >
              Tutup
            </EuiButton>
            <EuiButton
              onClick={handleImport}
              fill
              isDisabled={!file}
              style={{
                background: "#73A33F",
                color: "white",
                width: "100px",
              }}
            >
              Import
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
                <div>
                  {submiStatus === "Failed" ? (
                    <>
                      {submitMessage} <br/>
                      {submitMessage1}
                    </>
                  ) : (
                    <>
                    </>
                  )}
                  </div>
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

export default ModalBulkUnit;
