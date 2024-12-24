import React, { useState,useEffect } from "react";
import './forgotPsw.css';
import { EuiCard, EuiModal, EuiFieldPassword, EuiButton, EuiImage, EuiIcon, 
  EuiForm, EuiModalBody, EuiText, EuiModalFooter } from "@elastic/eui";
import Logo from "../../images/logo-dh-new.png";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { HTTP_STATUS, STATUS_MESSAGE } from "../../utils/Enums";

const NewPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [isSubmitResult, setIsSubmitResult] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState(''); 
  const showSubmitModal = () => setIsSubmitResult(true);
  const closeSubmitModal = () => {
    setIsSubmitResult(false)
    navigate('/')
  }

  // Validasi password
  const handlePasswordValidation = () => {
    if (password !== confirmPassword) {
      setErrorMessage('Input tidak sama');
      return false
    } else {
      setErrorMessage(null); 
      return true
    }
  };

  const getToken = () => {
    const storedToken = sessionStorage.getItem('resetToken');
    if (storedToken) {
      const { token, expiryTime } = JSON.parse(storedToken);
  
      if (Date.now() > expiryTime) {
        sessionStorage.removeItem('resetToken');
        return false
      }
      return token; 
    }
    return false; 
  };
  

  const handleSubmit = async() => {
    try{
      const isInputValid = handlePasswordValidation(); 
      if(!isInputValid){
        setSubmitStatus('Failed!');
        setSubmitMessage('Input password tidak sama!');
      }else{
        const isToken = getToken()
        if(!isToken){
          setSubmitStatus('Failed!');
          setSubmitMessage('Token sudah kadaluarsa atau tidak ada!');
        }else{
          const storedToken = sessionStorage.getItem('resetToken');
          const { id } = JSON.parse(storedToken);
          const res = await UserService.updatedPassword({user_id : id, new_password: password})
          if(res.status == '200'){
            sessionStorage.removeItem('resetToken');
            setSubmitStatus('Success!');
            setSubmitMessage('Berhasil reset password!');
          }else{
            setSubmitStatus('Failed!');
            setSubmitMessage(STATUS_MESSAGE.ERROR_API);
          }
        }
      }
    }catch(error){
      setSubmitStatus('Failed!');
      setSubmitMessage(error);
      console.log(error)
    }finally{
      showSubmitModal()
    }
  };

  return (
    <div className="login-container">
      <EuiCard title="">
        <div className="logo-container">
          <EuiImage src={Logo} alt="logo" style={{height:"85px", width:"150px"}}/>
        </div>
        <div className="version" style={{fontWeight: 700}}>NEW PASSWORD</div>
        <EuiForm >
        <div className="input-container">
          <div className="input-container">
            <EuiFieldPassword
              icon={<EuiIcon type="lock" size="m" />}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsPasswordValid(true);
              }}
              aria-label="Password"
              className={`input-field ${isPasswordValid ? "" : "input-error"}`}
            />
          </div>
            
          <div className="input-container">
            <EuiFieldPassword
              icon={<EuiIcon type="lock" size="m" />}
              placeholder="Ulangi Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              aria-label="Ulangi Password"
              className={`input-field ${isPasswordValid ? "" : "input-error"}`}
            />
          </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </div>

          <div className="button-container">
            <EuiButton
              style={{ background: "#73A33F", color: "white" }}
              fullWidth
              onClick={handleSubmit}
            >
              Submit
            </EuiButton>
          </div>

          <div className="button-container">
            <EuiButton
              style={{ background: "#ffffff", color: "#73a440", border: "solid 0.8px" }}
              fullWidth
              onClick={() => navigate('/')}
            >
              Login Page
            </EuiButton>
          </div>
        </EuiForm>
      </EuiCard>

      {isSubmitResult && (
        <EuiModal>
          <EuiModalBody>
            <EuiText style={{
                fontSize: '22px',
                height: '25%',
                marginTop: '25px',
                color: submitStatus === 'Success!' ? '#73A33F' : '#D52424' ,
                fontWeight: '600',
              }}>
              {submitMessage}
            </EuiText>
            <EuiText style={{
                fontSize: '15px',
                height: '25%',
                marginTop: '35px'
              }}>
                {submitStatus === 'Success!' ? 'Data berhasil terupdate.'
                : 'Data belum terupdate.'}
            </EuiText>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton onClick={closeSubmitModal} style={{ background: "#73A33F", color: "white" }}>
              Tutup
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}
    </div>
  );
};

export default NewPassword;
