import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutTemplate from './components/Layout';
import { useAuth } from './context/useAuth';


const LoginUser = lazy(() => import('./pages/Login'));
const HomePage = lazy(() => import('./pages/Home'));
const Details = lazy(() => import('./pages/DetailTrasactionDashboard'));


import FallbackUI from './components/FallbackUI';

const RouteApp = () => {
  const { isLogged } = useAuth();

 
  const routes = isLogged ? [
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<FallbackUI />}>
            <LoginUser />
          </Suspense>
        </LayoutTemplate>
      ),
      path: "/",
      errorElement: <FallbackUI />
    },
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<FallbackUI />}>
            <LoginUser />
          </Suspense>
        </LayoutTemplate>
      ),
      path: "/details",
      errorElement: <FallbackUI />
    },
  ] : [
    {
      element: (
        <Suspense fallback={<FallbackUI />}>
          <LoginUser/>
        </Suspense>
      ),
      path: '/',
      errorElement: <FallbackUI />
    }
  ];


  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router} />
  );
}

export default RouteApp;
