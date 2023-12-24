import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage'; 
import { Loginpage } from './components/card'; 
import Cookies from 'js-cookie';

const RouteApp = () => {
  const [authen, setAuthen] = useState(() => {
    const userCookie = Cookies.get('user');
    return Boolean(userCookie);
  });

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setAuthen(true);
    }
  }, []);

  return (
    <Routes>
       <Route path='/login' element={<Loginpage />} />
      
      <Route path='/' element={<HomePage />} />
     

    </Routes>
  );
};

export default RouteApp;

