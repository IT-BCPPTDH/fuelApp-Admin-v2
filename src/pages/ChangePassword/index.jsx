import React, { useState, useEffect } from 'react';
import DynamicPageHeader from "../../components/Breadcrumbs";
import { EuiModal, EuiModalBody, EuiModalFooter, EuiCard, EuiForm, EuiFormRow, EuiFieldPassword, EuiButton, EuiFlexGroup, EuiFlexItem, EuiText } from '@elastic/eui';
import UserService from '../../services/UserService';

const ChangePage = () => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")
  const user = JSON.parse(localStorage.getItem('user_data'));
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditResult, setIsEditResult] = useState(false)
  const [editMessage, setEditMessage] = useState('');
  const [editStatus, setEditStatus] = useState(''); 
  const showEditModal = () => setIsEditResult(true);
  const closeEditModal = () => {
    setIsEditResult(false)
    window.location.reload();
  }

  const breadcrumbs = [
    {
      text: 'Dashboard',
      href: '/',
    },
    {
      text: 'Change Password',
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
  ];

  const handleConfirmPasswordChange = (e) => {
    setConfirmedPassword(e.target.value);
    if (newPassword !== e.target.value) {
      setErrorMessage('Passwords do not match');
    } else {
      setErrorMessage('');
    }
  };


  const handleSubmitData = async () => {
    try {
      const data = {
        user_id: user.id,
        new_password: newPassword
      };
      const res = await UserService.updatedPassword(data)
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
  };

  return (
    <>
      <div className="padding-content">
        <DynamicPageHeader
          pageTitle="Change Password"
          breadcrumbs={breadcrumbs}
          pageTitleStyle={{ color: '#6a6a6a', fontSize: '24px' }}
        />
        <EuiCard title ={""} style={{width:"150vh", marginLeft:"20px", marginTop:"25px"}}>
          <EuiForm component="form" style={{width:"110vh", marginLeft:"18vh", marginTop:"30px"}}>
            {/* FlexGroup untuk menempatkan input New Password dan Confirm Password secara horizontal */}
            <EuiFlexGroup>
              <EuiFlexItem >
                <EuiFormRow label="New Password">
                  <EuiFieldPassword
                    placeholder="Enter new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow label="Confirm Password">
                  <EuiFieldPassword
                    placeholder="Confirm new password"
                    onChange={handleConfirmPasswordChange}
                  />
                </EuiFormRow>
              </EuiFlexItem>
            </EuiFlexGroup>

            {errorMessage && (
              <EuiText color="danger" style={{ marginTop: '10px' }}>
                {errorMessage}
              </EuiText>
            )}

            {/* FlexGroup for aligning the buttons to the right */}
            <EuiFlexGroup justifyContent="flexEnd" style={{marginTop:"30px", marginRight: "85px"}}>
              <EuiFlexItem grow={false}>
                <EuiButton color="text" 
                // onClick={handleCancel}
                >
                  Cancel
                </EuiButton>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton style={{ background: "#73A33F", color: "white" }} 
                onClick={handleSubmitData}
                >
                  Save
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiForm>
        </EuiCard>
      {isEditResult && (
        <EuiModal>
          <EuiModalBody>
            <EuiText style={{
                fontSize: '22px',
                height: '25%',
                marginTop: '25px',
                color: editStatus === 'success' ? '#D52424' : '#73A33F',
                fontWeight: '600',
              }}>
              {editMessage}
            </EuiText>
            <EuiText style={{
                fontSize: '15px',
                height: '25%',
                marginTop: '35px'
              }}>
                {editStatus === 'success' ? 'Data berhasil terupdate. Silahkan kembali untuk menambah data atau ke halaman utama.'
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
      </div>
    </>
  );
}

export default ChangePage;
