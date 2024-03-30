import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom'

const DashboardPage = lazy(() => import('./pages/DashboardPage'));

// Coal Hauling
const CoalHauling = lazy(() => import('./pages/CoalHauling'));
const CoalHaulingDataEntry = lazy(() => import('./pages/CoalHaulingDataEntry'));
const DetailHauling = lazy(() => import('./pages/DetailHauling'));

// Time Entry
const TimeEntryAll = lazy(() => import('./pages/TimeEntryAll'));
const TimeSheetPage = lazy(() => import('./pages/TimeSheetPage'));
const TimeEntryMinesEntryPage = lazy(() => import('./pages/TimeEntryMinesEntryPage'));
const TimeEntryMinesDetailPage = lazy(() => import('./pages/TimeEntryDetailPage'));

// Breakdown
const MonitoringBDPage = lazy(() => import('./pages/MonitoringBDPage'))
const BreakdownPage = lazy(() => import('./pages/BreakdownPage'))


const ProductionEntryPage = lazy(() => import('./pages/ProductionEntryPage'))
const DistanceEntryPage = lazy(() => import('./pages/DistanceEntryPage'))
const MineplanEntryPage = lazy(() => import('./pages/MineplanEntryPage'))
const HourMeterPage = lazy(() => import('./pages/HoursMeterPage'))
const FleetUnitPage = lazy(() => import('./pages/FleetUnitPage'))

const WeatherPage = lazy(() => import('./pages/WeatherPage'))

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
      <Route path='/breakdown'  element={<Suspense fallback={<div>Loading Breakdown Page...</div>}><BreakdownPage /></Suspense>} />
      <Route path='/production' element={<Suspense fallback={<div>Loading Production Page...</div>}><ProductionEntryPage /></Suspense>} />
      <Route path='/distance' element={<Suspense fallback={<div>Loading Distance Page...</div>}><DistanceEntryPage /></Suspense>} />
      <Route path='/mine-plan' element={<Suspense fallback={<div>Loading Mineplan Page...</div>}><MineplanEntryPage /></Suspense>} />
      <Route path='/hour-meter' element={<Suspense fallback={<div>Loading Hour Meter Page...</div>}><HourMeterPage /></Suspense>} />
      <Route path='/fleet-unit' element={<Suspense fallback={<div>Loading Fleet Unit Page...</div>}><FleetUnitPage /></Suspense>} />
      <Route path='/weather' element={<Suspense fallback={<div>Loading Weather Page...</div>}><WeatherPage /></Suspense>} />
      <Route path='/breakdowm-detail' element={<Suspense fallback={<div>Loading Breakdown Detail Page...</div>}><MonitoringBDPage /></Suspense>} />
    </Routes>
  )
}

export default RouteApp
