import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Cookies from 'js-cookie'
import { HomePage } from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'


const RouteApp = () => {

    const [authen, setAuthen] = useState(() => {
        const userCookie = Cookies.get('user')
        return Boolean(userCookie)
      })
    
      useEffect(() => {
        const userCookie = Cookies.get('user')
        if (userCookie) {
          setAuthen(true)
        }
      }, [authen])

  return (
    <Routes>
      <Route path='/' element={<DashboardPage />} />
      <Route path='/home' element={<HomePage />} />
    </Routes>
  )
}

export default RouteApp
