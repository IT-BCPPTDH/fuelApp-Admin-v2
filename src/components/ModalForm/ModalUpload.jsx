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
    // EuiIcon // EuiIcon tidak digunakan di dalam div, jadi bisa dihapus jika tidak perlu
} from '@elastic/eui';
import { URL_API } from '../../utils/Enums';
import reportService from '../../services/reportService';


const ModalUpload = () => {
    const modalTitleId = useGeneratedHtmlId();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const closeModal = () => setIsModalVisible(false);
    const showModal = () => setIsModalVisible(true);
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // State untuk modal hasil submit
    const [isSubmitResult, setIsSubmitResult] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [submiStatus, setSubmitStatus] = useState(''); 
    
    // State baru untuk menampung seluruh response data dari API
    const [uploadResult, setUploadResult] = useState(null);

    const showSubmitModal = () => setIsSubmitResult(true);
    const closeSubmitModal = () => {
      setIsSubmitResult(false);
      setUploadResult(null); // Reset hasil upload saat modal ditutup
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
          setErrorMessage('File harus berformat .xlsx!');
        }
      } else {
        setFile(null);
        setErrorMessage('File tidak ditemukan');
      }
    };
      
    const handleImport = async() => {
      const formData = new FormData();
      formData.append('files', file);

      try {
        const response = await reportService.uploadDatas(formData);
        
        // Asumsi jika request berhasil (status 2xx), response.data akan berisi objek hasil
        if (response.data) { 
          closeModal(); 
          setSubmitStatus('Success!');
          setSubmitMessage('Data Successfully submit!');
          setUploadResult(response.data); // Simpan seluruh objek response
        } else {
          // Skenario jika response sukses tapi tidak ada data
          throw new Error('Received an empty response from the server.');
        }
      } catch (error) {
        setSubmitStatus('error');
        // Menampilkan pesan error yang lebih informatif dari server jika ada
        const serverError = error.response?.data?.message || error.message;
        setSubmitMessage(`Upload Failed: ${serverError}`);
        setUploadResult(null); // Pastikan tidak ada data lama yang ditampilkan
      } finally {
        showSubmitModal();
      }
  };

  const handleDownloadTemplate = () => {
    const template = 'upload_data_template.xlsx'
    window.location.href = URL_API.generateTemplate + template
  };

  // Helper function untuk merender list alasan gagal
  const renderFailedReasons = () => {
    if (!uploadResult || !uploadResult.failedData || uploadResult.failedData.length === 0) {
      return null;
    }

    return (
      <>
        <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Alasan gagal:</p>
        <ol style={{ paddingLeft: '20px', margin: 0 }}>
          {uploadResult.failedData.map((item, index) => (
            <li key={index}>
              {item.no_unit}: {item.reason}
            </li>
          ))}
        </ol>
      </>
    );
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
                accept=".xlsx" // Menambahkan validasi tipe file di input
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
        <EuiModal onClose={closeSubmitModal}>
          <EuiModalBody>
            <EuiText style={{
                fontSize: '22px',
                marginTop: '25px',
                color: submiStatus === 'Success!' ? '#73A33F' : '#D52424',
                fontWeight: '600',
              }}>
              {submitMessage}
            </EuiText>
            
            {/* Tampilkan detail hasil hanya jika uploadResult ada dan statusnya success */}
            {uploadResult && submiStatus === 'Success!' && (
              <EuiText style={{ fontSize: '15px', marginTop: '20px', lineHeight: '1.6' }}>
                <div>
                  <p>Jumlah data berhasil: <strong>{uploadResult.successCount || 0}</strong></p>
                  
                  {/* Bagian Unit Kuota */}
                  {uploadResult.quotaAffectedUnits && uploadResult.quotaAffectedUnits.length > 0 && (
                    <>
                      <p>Jumlah unit quota: <strong>{uploadResult.quotaAffectedUnits.length}</strong></p>
                      <p>Unit kuota: {uploadResult.quotaAffectedUnits.join(', ')}</p>
                    </>
                  )}

                  {/* Bagian Unit Gagal */}
                  {uploadResult.failedCount > 0 && uploadResult.failedData && (
                    <>
                      <p style={{ marginTop: '10px' }}>Jumlah Unit gagal: <strong>{uploadResult.failedCount}</strong></p>
                      <p>Unit gagal: {uploadResult.failedData.map(item => item.no_unit).join(', ')}</p>
                      {renderFailedReasons()}
                    </>
                  )}
                </div>
              </EuiText>
            )}

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

export default ModalUpload;