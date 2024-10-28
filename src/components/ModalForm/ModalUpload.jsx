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
import reportService from '../../services/reportService';


const modalUpload = () => {
    const modalTitleId = useGeneratedHtmlId();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const closeModal = () => setIsModalVisible(false);
    const showModal = () => setIsModalVisible(true);
    const [file, setFile] = useState(null);

    const onFileChange = (event) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile)
        if (selectedFile && selectedFile.name.endsWith('.xlsx')) {
          setFile(selectedFile);
          setUploadStatus({ type: 'success', message: 'File yang diupload sesuai dengan template.' });
        } else {
          setFile(null);
          setUploadStatus({ type: 'danger', message: 'File yang diupload tidak sesuai. Pastikan menggunakan template yang benar.' });
        }
    };
      

  const handleImport = async() => {
    try {
        const response = await reportService.uploadDatas({files:file});
        console.log(response)
        onClose(); 
    //     if (response.status === "200") { 
    //         onClose(); 
    //     } else {
    //       console.log(`Gagal mendapatkan laporan: ${response.status}`);
    //     }
      } catch (error) {
        console.error("Terjadi kesalahan saat melakukan ekspor:", error);
      }
    
  };

  const handleDownloadTemplate = () => {
    const template = 'upload_data_template.xlsx'
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
    </>
  );
};

export default modalUpload;
