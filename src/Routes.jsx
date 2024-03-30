
import { lazy, Suspense } from 'react';
import { createHashRouter, RouterProvider } from "react-router-dom";
import LayoutTemplate from './components/Layout';
import { useAuth } from './context/useAuth';

const LoginPage = lazy(() => import('./pages/Login'))
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

  const { isLogged } = useAuth()

  const routes = isLogged ? [
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Dashboard...</div>}><DashboardPage /></Suspense>
        </LayoutTemplate>
      ),
      path: "/",
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Coal Hauling...</div>}><CoalHauling /></Suspense>
        </LayoutTemplate>
      ),
      path: '/coalhauling'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Detail Hauling...</div>}><DetailHauling /></Suspense>
        </LayoutTemplate>
      ),
      path: '/coalhauling-dataentry-detail/:tanggal/:sentAt'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Coal Hauling Data Entry...</div>}><CoalHaulingDataEntry /></Suspense>
        </LayoutTemplate>
      ),
      path: '/coalhauling-dataentry-form'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Time Entry Data Collector...</div>}><TimeEntryAll /></Suspense>
        </LayoutTemplate>
      ),
      path: '/time-entry-from-collector'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Time Entry Support Form...</div>}><TimeSheetPage /></Suspense>
        </LayoutTemplate>
      ),
      path: '/time-entry-support-form'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Time Entry Digger Form...</div>}><TimeSheetPage /></Suspense>
        </LayoutTemplate>
      ),
      path: '/time-entry-digger-form'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Time Entry Hauler Form...</div>}><TimeSheetPage /></Suspense>
        </LayoutTemplate>
      ),
      path: '/time-entry-hauler-form'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Time Entry Detail...</div>}><TimeEntryMinesDetailPage /></Suspense>
        </LayoutTemplate>
      ),
      path: '/time-entry-detail/:tanggal/:type'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Time Sheet...</div>}><TimeEntryMinesEntryPage /></Suspense>
        </LayoutTemplate>
      ),
      path: '/time-sheet-mines'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Time Sheet...</div>}><TimeEntryMinesEntryPage /></Suspense>
        </LayoutTemplate>
      ),
      path: '/time-sheet-fms'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Breakdown Page...</div>}><BreakdownPage /></Suspense>
        </LayoutTemplate>
      ),
      path: '/breakdown'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Production Page...</div>}><ProductionEntryPage /></Suspense>
        </LayoutTemplate>
      ),
      path: '/production'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Distance Page...</div>}><DistanceEntryPage /></Suspense>
        </LayoutTemplate>
      ),
      path: '/distance'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Mineplan Page...</div>}><MineplanEntryPage /></Suspense>
        </LayoutTemplate>
      ),
      path: '/mine-plan'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Hour Meter Page...</div>}><HourMeterPage /></Suspense>
        </LayoutTemplate>
      ),
      path: '/hour-meter'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Fleet Unit Page...</div>}><FleetUnitPage /></Suspense>
        </LayoutTemplate>
      ),
      path: '/fleet-unit'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Weather Page...</div>}><WeatherPage /></Suspense>
        </LayoutTemplate>
      ),
      path: '/weather'
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Breakdown Detail Page...</div>}><MonitoringBDPage /></Suspense>
        </LayoutTemplate>
      ),
      path: '/breakdowm-detail'
    }
  ] : [
    {
      element: (
        <Suspense fallback={<div>Loading ...</div>}><LoginPage /></Suspense>
      ),
      path: '/'
    }
  ];

  const router = createHashRouter(routes);

  return  <RouterProvider router={router} />
}

export default RouteApp