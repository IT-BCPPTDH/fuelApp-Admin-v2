import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Login from './pages/Login';


const RouteApp = () => {
  const [authen, setAuthen] = useState(() => {
    const userCookie = Cookies.get('token');
    return Boolean(userCookie);
  });

  useEffect(() => {
    const userCookie = Cookies.get('token');
    if (userCookie) {
      setAuthen(true);
    }
  }, []);  

  return (
    <Routes>
      {
            !authen?(
              <>
              <Route path="*" exec element={<Login />} />
              </>
            ):(
              <>
              <Route path='/' element={<DashboardPage />} />
              <Route path='/home' element={<HomePage />} />
              </>
            )
        }
      
    </Routes>
  )
}


export default RouteApp;

