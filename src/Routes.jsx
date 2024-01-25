import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import TimeSheetPage from './pages/TimeSheetPage'
import { ProductionEntryPage } from './pages/ProductionEntryPage'
import { MineplanEntryPage } from './pages/MineplanEntryPage'
import { TimeEntryMinesEntryPage } from './pages/TimeEntryMinesEntryPage'

const RouteApp = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardPage />} />
      <Route path='/collector/:id' element={<HomePage />} />
      <Route path='/timesheet-dataentry' element={<TimeSheetPage />}></Route>
      <Route path='/production' element={<ProductionEntryPage />}></Route>
      <Route path='/mineplan' element={<MineplanEntryPage />}></Route>
      <Route path='/time-entry-mines' element={<TimeEntryMinesEntryPage />}></Route>
    </Routes>
  )
}

export default RouteApp
