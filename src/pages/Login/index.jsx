import React, { useState } from "react";
import './login.css';
import { EuiCard, EuiFieldText, EuiFieldPassword, EuiButton, EuiImage, EuiIcon, EuiForm } from "@elastic/eui";
import Logo from "../../images/logo_darma_henwa.png";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService"; // Import your UserService
import { HTTP_STATUS, STATUS_MESSAGE } from "../../utils/Enums"; // Import HTTP status and status messages
import { useAuth } from "../../context/useAuth"; // Import your authentication context

const LoginUser = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context
  
  const [jde, setJde] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isJdeValid, setIsJdeValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  
  const handleLogin = async () => {
    try {
      // Simple validation checks
      if (!jde || !password) {
        setIsJdeValid(!!jde);
        setIsPasswordValid(!!password);
        return;
      }

      // Debugging: Log the values before making the request
      console.log('Attempting login with JDE:', jde, 'Password:', password);

      const response = await UserService.authLogin({ JDE: jde, password });

      // Debugging: Log the response
      console.log('Login response:', response);

      if (response.status === HTTP_STATUS.OK || response.status === HTTP_STATUS.CREATED) {
        login(response.session_token, response.data, response.access); // Perform login
        window.location.reload(); // Reload to apply changes
      } else if (response.status === HTTP_STATUS.NO_CONTENT) {
        setIsPasswordValid(false);
        setError(STATUS_MESSAGE.INVALID_JDE);
      } else if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        setError(STATUS_MESSAGE.CRED_NOT_FOUND);
      } else {
        setError(STATUS_MESSAGE.ERR_AUTH);
      }
    } catch (error) {
      // Debugging: Log any errors caught
      console.error("Error during login:", error);
      setError(STATUS_MESSAGE.ERR_AUTH);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-container">
      <EuiCard title="">
        <div className="logo-container">
          <EuiImage src={Logo} height="40px" alt="logo" />
        </div>
        <div className="version">Fuel App Admin V2.0</div>
        {error && <div className="error-message">{error}</div>}
        <EuiForm onSubmit={handleSubmit}>
          <div className="input-container">
            <EuiFieldText
              icon="user" // This should correctly display the user icon
              placeholder="No Identitas Pegawai"
              value={jde}
              onChange={onChangeUsername}
              aria-label="Username"
              className={`input-field ${isJdeValid ? "" : "input-error"}`}
            />
          </div>

          <div className="input-container">
            <EuiFieldPassword
              icon={<EuiIcon type="lock" size="m" />} // Display the lock icon inside the password field
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              aria-label="Password"
              className={`input-field ${isPasswordValid ? "" : "input-error"}`}
            />
          </div>

          <div className="button-container">
            <EuiButton
              style={{ background: "#73A33F", color: "white" }}
              fullWidth
              type="submit" // Ensure this triggers form submission
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
        </EuiForm>
      </EuiCard>
    </div>
  );
};

export default LoginUser;
