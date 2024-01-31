import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
import TimeSheetPage from './pages/TimeSheetPage';
import CoalHauling from './pages/CoalHauling';


const RouteApp = () => {
  // const [authen, setAuthen] = useState(() => {
  //   const userCookie = Cookies.get('token');
  //   return Boolean(userCookie);
  // });

  // useEffect(() => {
  //   const userCookie = Cookies.get('token');
  //   if (userCookie) {
  //     setAuthen(true);
  //   }
  // }, []);  

  return (
    <Routes>
      <Route path='/' element={<DashboardPage />} />
      <Route path='/collector/:id' element={<HomePage />} />    
      <Route path='/timesheet-dataentry' element={<TimeSheetPage />}></Route>
      <Route path='/coalhauling-dataentry' element={<CoalHauling />}></Route>
  </Routes>
  )
}


export default RouteApp;

