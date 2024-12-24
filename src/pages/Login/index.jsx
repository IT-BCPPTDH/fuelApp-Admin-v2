import React, { useState, useEffect } from "react";
import './login.css';
import { EuiCard, EuiFieldText, EuiFieldPassword, EuiButton, EuiImage, EuiIcon, EuiForm } from "@elastic/eui";
import Logo from "../../images/logo-dh-new.png";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { HTTP_STATUS, STATUS_MESSAGE } from "../../utils/Enums";
import { useAuth } from "../../context/useAuth";

const LoginUser = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [jde, setJde] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isJdeValid, setIsJdeValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleLogin = async () => {
    try {
      if (!jde || !password) {
        setIsJdeValid(!!jde);
        setIsPasswordValid(!!password);
        return;
      }
  
      const response = await UserService.authLogin({ JDE: jde, password: password });
  
      if (response.status === HTTP_STATUS.OK || response.status === HTTP_STATUS.CREATED) {
        // Store data in localStorage
        localStorage.setItem('session_token', response.session_token);
        localStorage.setItem('user_data', JSON.stringify(response.data));
        localStorage.setItem('access', response.access);
  
        login(response.session_token, response.data, response.access);
        window.location.reload();
      } else if (response.status === HTTP_STATUS.NO_CONTENT) {
        setIsPasswordValid(false);
        setErrorMessage(STATUS_MESSAGE.INVALID_JDE);
      } else if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        setErrorMessage(STATUS_MESSAGE.CRED_NOT_FOUND);
      } else {
        setErrorMessage(STATUS_MESSAGE.ERR_AUTH);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(STATUS_MESSAGE.ERR_AUTH);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      try {
        const cachedUsers = sessionStorage.getItem("admin");
        if (cachedUsers) return;

        const res = await UserService.getAllEmployee()

        if (res.status === '404') {
          sessionStorage.setItem("admin", JSON.stringify([]));
        } else if (res.status === '200') {
          const result = res.data.filter(item => item.admin_fuel === true);
          sessionStorage.setItem("admin", JSON.stringify(result));
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
        }
      }

      return () => {
        controller.abort();
      };
    };

    fetchUser();
  }, []);
  

  return (
    <div className="login-container">
      <EuiCard title="">
        <div className="logo-container">
          <EuiImage src={Logo} alt="logo" style={{height:"85px", width:"150px"}}/>
        </div>
        <div className="version" style={{fontWeight: 700}}>Fuel App Admin V2.0</div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <EuiForm >
          <div className="input-container">
            <EuiFieldText
              icon="user"
              placeholder="No Identitas Pegawai"
              value={jde}
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValidInput = /^[a-zA-Z0-9]*$/.test(inputValue);

                if (isValidInput) {
                  setJde(inputValue);
                  setIsJdeValid(true);
                  setErrorMessage(null);
                } else {
                  setIsJdeValid(false);
                  setErrorMessage(STATUS_MESSAGE.INVALID_CHAR);
                }
              }}
              aria-label="Username"
              className={`input-field ${isJdeValid ? "" : "input-error"}`}
            />
          </div>

          <div className="input-container">
            <EuiFieldPassword
              icon={<EuiIcon type="lock" size="m" />}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsPasswordValid(true);
                setErrorMessage(null);
              }}
              aria-label="Password"
              className={`input-field ${isPasswordValid ? "" : "input-error"}`}
            />
          </div>

          <div className="button-container">
            <EuiButton
              style={{ background: "#73A33F", color: "white" }}
              fullWidth
              onClick={handleLogin}
            >
              Sign In
            </EuiButton>
          </div>

          <div className="button-container">
            <EuiButton
              style={{ background: "#ffffff", color: "#73a440", border: "solid 0.8px" }}
              fullWidth
              onClick={() => navigate('/forgotPassword')}
            >
              Forgot Password
            </EuiButton>
          </div>
        </EuiForm>
      </EuiCard>
    </div>
  );
};

export default LoginUser;
