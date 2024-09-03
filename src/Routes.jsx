// App.jsx or RouteApp.jsx
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout'; // Ensure correct import path
import FallbackUI from './components/FallbackUI';
import StockSystemPage from './pages/StockSystem';
import { useAuth } from './context/useAuth';

const LoginPage = lazy(() => import('./pages/Login'));
const HomePage = lazy(() => import('./pages/Home'));
const Details = lazy(() => import('./pages/DetailTrasactionDashboard'));
const ReportFuel = lazy(() => import('./pages/Reports'));
const AddQouta = lazy(()=>import('./pages/RequestQouta'));
const StationPage = lazy(()=>import('./pages/Station/index'));
const StockSystem = lazy(()=>import('./pages/StockSystem'));

const DetailsPageTransaction = lazy(()=>import('./pages/DetailTrasactionDashboard/detailTransaction'));
const ElipsePage = lazy(()=>import('./pages/Elipse'));

const RouteApp = () => {
  const {isLogged}=useAuth()


  const routes = isLogged ? [
    {
      element: (
        <Layout>
          <Suspense fallback={<div>Loading Homepage...</div>}>
            <HomePage />
          </Suspense>
        </Layout>
      ),
      path: "/",
      errorElement: <FallbackUI />,
    },
    {
      element: (
        <Layout>
          <Suspense fallback={<div>Loading Homepage...</div>}>
            <Details />
          </Suspense>
        </Layout>
      ),
      path: '/details/:station',
      errorElement: <FallbackUI />,
    },

    {
      element: (
        <Layout>
          <Suspense fallback={<div>Loading Homepage...</div>}>
            <DetailsPageTransaction />
          </Suspense>
        </Layout>
      ),
      path: '/details',
      errorElement: <FallbackUI />,
    },
    
    {
      element: (
     
          <Suspense fallback={<div>Loading Report Fuel...</div>}>
            <ReportFuel />
          </Suspense>
      
      ),
      path: "/report-lkf",
      errorElement: <FallbackUI />
    },

    {
      element: (
        <Layout>
          <Suspense fallback={<div>Loading Homepage...</div>}>
            <AddQouta />
          </Suspense>
        </Layout>
      ),
      path: '/add-data-qouta',
      errorElement: <FallbackUI />,
    },
    {
      element: (
        <Layout>
          <Suspense fallback={<div>Loading Station...</div>}>
            <StationPage />
          </Suspense>
        </Layout>
      ),
      path: '/master-station',
      errorElement: <FallbackUI />,
    },
    {
      element: (
        <Layout>
          <Suspense fallback={<div>Loading Station...</div>}>
            <StockSystemPage/>
          </Suspense>
        </Layout>
      ),
      path: '/master-stock-system',
      errorElement: <FallbackUI />,
    },
    {
      element: (
        <Layout>
          <Suspense fallback={<div>Loading Station...</div>}>
            <ElipsePage/>
          </Suspense>
        </Layout>
      ),
      path: '/master-elipse',
      errorElement: <FallbackUI />,
    },
  ]:[
        
    {
      element: (
        <Suspense fallback={<div>Loading ...</div>}>
          <LoginPage />
        </Suspense>
      ),
      path: "/",
      errorElement: <FallbackUI />,
    },
    
  ]

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default RouteApp;
