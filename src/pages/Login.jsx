import { Loginpage } from '../components/LoginPage'
import backgroundImage from '../images/bglogin.png'

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
            height: 42vh; 
            overflow: hidden; 
          }
        `}
      </style>

      <Loginpage />
    </>
  )
}

export default Login
