// App.jsx or RouteApp.jsx
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout'; // Ensure correct import path
import FallbackUI from './components/FallbackUI';



const LoginPage = lazy(() => import('./pages/Login'));
const HomePage = lazy(() => import('./pages/Home'));
const Details = lazy(() => import('./pages/DetailTrasactionDashboard'));
const ReportFuel = lazy(() => import('./pages/Reports'));
const AddQouta = lazy(()=>import('./pages/RequestQouta'))
const RouteApp = () => {
  const isLogged = true; // Simulated authentication check

  const routes = [
    {
      element: (
        <Layout>
          <Suspense fallback={<div>Loading Homepage...</div>}>
            <HomePage />
          </Suspense>
        </Layout>
      ),
      path: '/',
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
     
          <Suspense fallback={<div>Loading Report Fuel...</div>}>
            <ReportFuel />
          </Suspense>
      
      ),
      path: "/report-fuel",
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
        <Suspense fallback={<div>Loading ...</div>}>
          <LoginPage />
        </Suspense>
      ),
      path: '/login',
      errorElement: <FallbackUI />,
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default RouteApp;
