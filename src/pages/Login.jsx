import React from "react";
import { Loginpage } from "../components/card";
import backgroundImage from "../images/bglogin.png"; // Update the path accordingly

const Login = () => {
  return (
    <>
    
      <style>
        {`
          body {
            background: url(${backgroundImage}) center center no-repeat;
            background-size: cover;
            posision:absolute;x
            margin: 0; 
            height: 100vh; 
            overflow: hidden; 
          }
        `}
      </style>
      <h1>
        <Loginpage />
      </h1>
    </>
  );
};

export default Login;


