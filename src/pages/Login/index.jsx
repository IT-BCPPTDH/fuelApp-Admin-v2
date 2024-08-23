import React, { useState } from "react";
import './login.css';
import { EuiCard, EuiFieldText, EuiFieldPassword, EuiButton, EuiImage, EuiIcon } from "@elastic/eui";
import Logo from "../../images/logo_darma_henwa.png";
import { useNavigate } from "react-router-dom";

const FAKE_USER = {
  username: '120020',
  password: 'abcd1234'
};

const LoginUser = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const handleSubmit = () => {
    if (username === FAKE_USER.username && password === FAKE_USER.password) {
      setError(''); // Clear any previous error
      navigate('/'); // Redirect to homepage
    } else {
      setError('Username atau Password Salah Mohon Check Kembali');
    }
  };

  return (
    <div className="login-container">
      <EuiCard title="">
        <div className="logo-container">
          <EuiImage src={Logo} height="40px" alt="logo" />
        </div>
        <div className="version">Fuel App Admin V2.0</div>
        {error && <div className="error-message">{error}</div>}
        
        <div className="input-container">
          <EuiFieldText
            icon="user" // This should correctly display the user icon
            placeholder="No Identitas Pegawai"
            value={username}
            onChange={onChangeUsername}
            aria-label="Username"
            className="input-field"
          />
        </div>

        <div className="input-container">
          <EuiFieldPassword
            icon={<EuiIcon type="lock" size="m" />} // Display the lock icon inside the password field
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
            aria-label="Password"
            className="input-field"
          />
        </div>

        <div className="button-container">
          <EuiButton
            style={{ background: "#73A33F", color: "white" }}
            fullWidth
            onClick={handleSubmit}
          >
            Sign In
          </EuiButton>
        </div>

        <div className="button-container">
          <EuiButton
            style={{ background: "#ffffff", color: "#73a440", border: "solid 0.8px" }}
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
