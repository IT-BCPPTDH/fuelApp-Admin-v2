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
            height: 100vh; 
            overflow: hidden; 
          }
        `}
      </style>

      <Loginpage />
    </>
  )
}

export default Login
