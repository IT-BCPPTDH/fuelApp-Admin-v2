import React, { useState } from "react";
import './forgotPsw.css';
import { EuiCard, EuiFieldText,  EuiButton, EuiImage, EuiLoadingSpinner, EuiForm } from "@elastic/eui";
import Logo from "../../images/logo-dh-new.png";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

const SubmitJde = () => {
  const navigate = useNavigate();
  
  const [jde, setJde] = useState("");
  const [fullname, setFullname] = useState("");
  const [empId, setEmpId] = useState(null)
  const [isJdeValid, setIsJdeValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const STATUS_MESSAGE = {
    INVALID_CHAR: "Nomor identitas mengandung karakter tidak valid.",
    NOT_FOUND: "Nama tidak ditemukan.",
    ERROR_API: "Something Wrong!"
  };

  const checkEmployee = async (inputValue) => {
    try {
      setIsLoading(true);
      setFullname("");
      setErrorMessage(null);
      setIsSubmitEnabled(false);
  
      const employees = JSON.parse(sessionStorage.getItem("admin") || "[]");
      const employee = employees.find((emp) => emp.JDE === inputValue);
  
      if (employee) {
        setEmpId(employee.id)
        setFullname(employee.fullname);
        setIsSubmitEnabled(true);
      } else {
        setErrorMessage(STATUS_MESSAGE.NOT_FOUND);
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan saat memeriksa data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJdeChange = (e) => {
    const inputValue = e.target.value;
    const isValidInput = /^[a-zA-Z0-9]*$/.test(inputValue);

    if (isValidInput) {
      setJde(inputValue);
      setIsJdeValid(true);

      if (inputValue) {
        checkEmployee(inputValue);
      } else {
        setFullname("");
        setIsSubmitEnabled(false);
      }
    } else {
      setIsJdeValid(false);
      setErrorMessage(STATUS_MESSAGE.INVALID_CHAR);
    }
  };

  const handleSubmit = async() => {
    try{
        const token = Math.random().toString(36).substr(2) + Date.now().toString(36)
        const expiryTime = Date.now() + 60 * 60 * 1000; 
        const tokenData = {
          id: empId,
          token: token,
          expiryTime: expiryTime,
        };
        sessionStorage.setItem('resetToken', JSON.stringify(tokenData));
        console.log("first")
        navigate('/newPassword')
    }catch(error){
        console.log(error)
    }
  };
  
  return (
    <div className="login-container">
      <EuiCard title="">
        <div className="logo-container">
          <EuiImage src={Logo} alt="logo" style={{height:"85px", width:"150px"}}/>
        </div>
        <div className="version" style={{fontWeight: 700}}>CEK EMPLOYEE ID</div>
        <EuiForm >
          <div className="input-container">
            <EuiFieldText
              icon="user"
              placeholder="No Identitas Pegawai"
              value={jde}
              onChange={handleJdeChange}
              aria-label="Username"
              className={`input-field ${isJdeValid ? "" : "input-error"}`}
            />
          </div>

          <div className="input-container">
            {isLoading ? (
              <EuiLoadingSpinner size="m" />
            ) : (
              <EuiFieldText
                icon="user"
                placeholder="Nama Pegawai"
                value={fullname}
                readOnly
                aria-label="Nama Pegawai"
              />
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>

          <div className="button-container">
            <EuiButton
              style={{ background: "#73A33F", color: "white" }}
              fullWidth
              onClick={handleSubmit}
              isDisabled={!isSubmitEnabled}
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
              Back
            </EuiButton>
          </div>

        </EuiForm>
      </EuiCard>
    </div>
  );
};

export default SubmitJde;
