import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import CoalHauling from './pages/CoalHauling';
import TimeSheetPage from './pages/TimeSheetPage'
import { ProductionEntryPage } from './pages/ProductionEntryPage'
import { MineplanEntryPage } from './pages/MineplanEntryPage'
import { TimeEntryMinesEntryPage } from './pages/TimeEntryMinesEntryPage'
import { RekapTimeEntryPage } from './pages/RekapTimeEntryPage'
import DistanceEntryPage from './pages/DistanceEntryPage';

const RouteApp = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardPage />} />
      <Route path='/collector/:id' element={<HomePage />} />
      <Route path='/timesheet-dataentry' element={<TimeSheetPage />}></Route>
      <Route path='/coalhauling-dataentry' element={<CoalHauling />}></Route>
      <Route path='/production' element={<ProductionEntryPage />}></Route>
      <Route path='/mineplan' element={<MineplanEntryPage />}></Route>
      <Route path='/time-sheet-mines' element={<TimeEntryMinesEntryPage />}></Route>
      <Route path='/time-entry-production' element={<RekapTimeEntryPage />}></Route>
      <Route path='/distance-data-entry' element={<DistanceEntryPage />}></Route>
    </Routes>

  )
}

export default RouteApp
