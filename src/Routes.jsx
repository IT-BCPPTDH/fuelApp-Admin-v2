import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutTemplate from './components/Layout';
import FallbackUI from './components/FallbackUI';

// Lazy-loaded components
const LoginUser = lazy(() => import('./pages/Login'));
const HomePage = lazy(() => import('./pages/Home'));
const Details = lazy(() => import('./pages/DetailTrasactionDashboard'));
const ReportFuel = lazy(() => import('./pages/Reports'));

const RouteApp = () => {
  // Define routes directly without authentication check
  const routes = [
    {
      element: (
      
          <Suspense fallback={<div>Loading Dashboard...</div>}>
            <HomePage />
          </Suspense>
      
      ),
      path: "/",
      errorElement: <FallbackUI />
    },
    {
      element: (
      
          <Suspense fallback={<div>Loading Detail Transaction...</div>}>
            <Details />
          </Suspense>
       
      ),
      path: "/details",
      errorElement: <FallbackUI />
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
        <Suspense fallback={<FallbackUI />}>
          <LoginUser />
        </Suspense>
      ),
      path: '/login',
      errorElement: <FallbackUI />
    }
  ];

  // Create and return the router
  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router} />
  );
}

export default RouteApp;
