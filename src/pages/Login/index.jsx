
import React, { useState } from "react";
import './login.css';
import { EuiCard, EuiFieldText, EuiButton, EuiImage, EuiSelect, EuiDatePicker } from "@elastic/eui";
import Logo from "../../images/logo_darma_henwa.png";
import { useNavigate } from "react-router-dom";



const FAKE_USER = {
  username: 'testuser',
  password: 'password123'
};

const LoginUser = () => {
  const navigate = useNavigate();
 
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChangeUsername = (e) => setValue(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const handleSubmit = () => {
   
    if (value === FAKE_USER.username && password === FAKE_USER.password) {
     
      setError('');
     
      navigate('/'); 
    } else {
     
      setError('Username atau Password Salah Mohon Check Kembali');
    }
  };

  return (
    <div className="login-container">
      <EuiCard title="">
        <div className="version">
          <EuiImage src={Logo} height="40px" alt="logo" />
        </div>
        <div className="version">Fuel App Admin V2.0</div>
        {error && <div style={{ color: 'red', fontSize:"12px" ,marginBottom: '10px' }}>{error}</div>}
        <div style={{ marginTop: "20px" }}>
          <EuiFieldText
            placeholder="Username"
            type="text"
            value={value}
            onChange={onChangeUsername}
          />
        </div>
        <div style={{ marginTop: "5px" }}>
          <EuiFieldText
            placeholder="Password"
            type="password"
            value={password}
            onChange={onChangePassword}
          />
        </div>
       
        <div style={{ marginTop: "20px" }}>
          <EuiButton
            style={{ background: "#73A33F", color: "white" }}
            fullWidth
            onClick={handleSubmit}
          >
            Sign In
          </EuiButton>
        </div>
        <div style={{ marginTop: "20px" }}>
          <EuiButton
            style={{ background: "#ffffff", color: "#73a440", border:"solid 0.8px" }}
            fullWidth
            onClick={() => navigate('/')} 
          >
            Back To Home
          </EuiButton>
        </div>
     
      </EuiCard>
    </div>
  );
};

export default LoginUser;
