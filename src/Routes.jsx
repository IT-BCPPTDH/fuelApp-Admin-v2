import { Route, Routes } from 'react-router-dom'

// import { HomePage } from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'

import CoalHauling from './pages/CoalHauling';
import CoalHaulingDataEntry from './pages/CoalHaulingDataEntry';
import DetailHauling from './pages/DetailHauling';
// import AdminCoalHauling from './pages/AdminCoalHauling';
// import InputUnit from './pages/AdminCoalHauling/InputUnit';
// import InputOperator from './pages/AdminCoalHauling/InputOperator';

import TimeEntryAll from './pages/TimeEntryAll';
import TimeSheetPage from './pages/TimeSheetPage'
import TimeEntryMinesEntryPage from './pages/TimeEntryMinesEntryPage'
import ProductionDiggerPage from './pages/TimeEntryDigger';
import ProductionHaulerPage from './pages/TimeEntryHauler';

import { ProductionEntryPage } from './pages/ProductionEntryPage'
import { MineplanEntryPage } from './pages/MineplanEntryPage'
import { RekapTimeEntryPage } from './pages/RekapTimeEntryPage'

import DistanceEntryPage from './pages/DistanceEntryPage';

const RouteApp = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardPage />} />
      {/* <Route path='/collector/:id' element={<HomePage />} /> */}

      <Route path='/coalhauling' element={<CoalHauling />}></Route>
      <Route path='/coalhauling-dataentry-detail/:tanggal' element={<DetailHauling />}></Route>
      <Route path='/coalhauling-dataentry-form' element={<CoalHaulingDataEntry />}></Route>

      {/* <Route path='/coalhauling-admin' element={<AdminCoalHauling />}></Route>
      <Route path='/coalhaulig-admin/nounit/' element={<InputUnit />}></Route>
      <Route path='/coalhaulig-admin/operator/' element={<InputOperator />}></Route> */}
      
      <Route path='/time-entry-from-collector' element={<TimeEntryAll />} />
      <Route path='/time-entry-support-form' element={<TimeSheetPage />} />
      <Route path='/time-entry-digger-form' element={<ProductionDiggerPage />} />
      <Route path='/time-entry-hauler-form' element={<ProductionHaulerPage />} />


      <Route path='/time-sheet-mines' element={<TimeEntryMinesEntryPage />}></Route>
      <Route path='/time-sheet-fms' element={<TimeEntryMinesEntryPage />}></Route>
      <Route path='/time-entry-production' element={<RekapTimeEntryPage />}></Route>
      
      

      <Route path='/production' element={<ProductionEntryPage />}></Route>
      <Route path='/mineplan' element={<MineplanEntryPage />}></Route>
      <Route path='/distance-data-entry' element={<DistanceEntryPage />}></Route>
    </Routes>
  )
}

export default RouteApp
