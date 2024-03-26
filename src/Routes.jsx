import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom'

const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CoalHauling = lazy(() => import('./pages/CoalHauling'));
const CoalHaulingDataEntry = lazy(() => import('./pages/CoalHaulingDataEntry'));
const DetailHauling = lazy(() => import('./pages/DetailHauling'));
const TimeEntryAll = lazy(() => import('./pages/TimeEntryAll'));
const TimeSheetPage = lazy(() => import('./pages/TimeSheetPage'));
const TimeEntryMinesEntryPage = lazy(() => import('./pages/TimeEntryMinesEntryPage'));
const TimeEntryMinesDetailPage = lazy(() => import('./pages/TimeEntryDetailPage'));
const MonitoringBDPage = lazy(() => import('./pages/MonitoringBDPage'))

// import ProductionEntryPage from './pages/ProductionEntryPage'
// import MineplanEntryPage from './pages/MineplanEntryPage'
// import RekapTimeEntryPage from './pages/RekapTimeEntryPage'
// import DistanceEntryPage from './pages/DistanceEntryPage';
// import { HomePage } from './pages/HomePage'
// import AdminCoalHauling from './pages/AdminCoalHauling';
// import InputUnit from './pages/AdminCoalHauling/InputUnit';
// import InputOperator from './pages/AdminCoalHauling/InputOperator';

const RouteApp = () => {
  return (
    <Routes>

      <Route path='/' element={<Suspense fallback={<div>Loading Dashboard...</div>}><DashboardPage /></Suspense>} />
      <Route path='/coalhauling' element={<Suspense fallback={<div>Loading Coal Hauling...</div>}><CoalHauling /></Suspense>} />
      <Route path='/coalhauling-dataentry-detail/:tanggal/:sentAt' element={<Suspense fallback={<div>Loading Detail Hauling...</div>}><DetailHauling /></Suspense>} />
      <Route path='/coalhauling-dataentry-form' element={<Suspense fallback={<div>Loading Coal Hauling Data Entry...</div>}><CoalHaulingDataEntry /></Suspense>} />
      <Route path='/time-entry-from-fms' element={<Suspense fallback={<div>Loading Time Entry from FMS...</div>}><TimeEntryAll /></Suspense>} />
      <Route path='/time-entry-from-collector' element={<Suspense fallback={<div>Loading Time Entry from FMS...</div>}><TimeEntryAll /></Suspense>} />
      <Route path='/time-entry-support-form' element={<Suspense fallback={<div>Loading Time Sheet...</div>}><TimeSheetPage /></Suspense>} />
      <Route path='/time-entry-digger-form' element={<Suspense fallback={<div>Loading Time Sheet...</div>}><TimeSheetPage /></Suspense>} />
      <Route path='/time-entry-hauler-form' element={<Suspense fallback={<div>Loading Time Sheet...</div>}><TimeSheetPage /></Suspense>} />
      <Route path='/time-entry-detail/:tanggal/:type' element={<Suspense fallback={<div>Loading Time Entry Detail...</div>}><TimeEntryMinesDetailPage /></Suspense>} />
      <Route path='/time-sheet-mines' element={<Suspense fallback={<div>Loading Time Sheet...</div>}><TimeEntryMinesEntryPage /></Suspense>} />
      <Route path='/time-sheet-fms' element={<Suspense fallback={<div>Loading Time Sheet...</div>}><TimeEntryMinesEntryPage /></Suspense>} />
      <Route path='/monitoring-breakdown'  element={<Suspense fallback={<div>Loading Monitoring BD Sheet...</div>}><MonitoringBDPage /></Suspense>} />

      {/* <Route path='/time-entry-production' element={<RekapTimeEntryPage />}></Route>
      <Route path='/production' element={<ProductionEntryPage />}></Route>
      <Route path='/mineplan' element={<MineplanEntryPage />}></Route>
      <Route path='/distance-data-entry' element={<DistanceEntryPage />}></Route> */}
      {/* <Route path='/collector/:id' element={<HomePage />} />
      <Route path='/coalhauling-admin' element={<AdminCoalHauling />}></Route>
      <Route path='/coalhaulig-admin/nounit/' element={<InputUnit />}></Route>
      <Route path='/coalhaulig-admin/operator/' element={<InputOperator />}></Route> */}
    </Routes>
  )
}

export default RouteApp
