import React, { useState } from "react";
import './login.css';
import { EuiCard, EuiFieldText, EuiButton, EuiImage, EuiSelect } from "@elastic/eui";
import Logo from "../../images/logo_darma_henwa.png";

import { useNavigate } from "react-router-dom"; 
import { EuiIcon } from '@elastic/eui';
const LoginUser = () => {
  const navigate = useNavigate(); 
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsername = (e) => {
    setValue(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {

    console.log('Username:', value);
    console.log('Password:', password);

    navigate('/'); 
  };

  return (
    <div className="login-container">
      <EuiCard title="">
        
        <div className="version">
          <EuiImage src={Logo} height="40px" alt="logo" />
        </div>
        <div className="version">Fuel App V2</div>
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
      </EuiCard>
    </div>
  );
};

export default LoginUser;
