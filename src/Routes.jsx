import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import TimeSheetPage from './pages/TimeSheetPage'

const RouteApp = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardPage />} />
      <Route path='/collector/:id' element={<HomePage />} />
      <Route path='/timesheet-dataentry' element={<TimeSheetPage />}></Route>
    </Routes>
  )
}

export default RouteApp
