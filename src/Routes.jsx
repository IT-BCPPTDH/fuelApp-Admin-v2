
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutTemplate from './components/Layout';
import { useAuth } from './context/useAuth';


import LoginUser from "./pages/Login"

import FallbackUI from './components/FallbackUI';

const RouteApp = () => {

  const { isLogged } = useAuth()

  const routes = isLogged ? [
    {
      element: (
        <LayoutTemplate>
          <Suspense fallback={<div>Loading Homepage...</div>}><HomePage /></Suspense>
        </LayoutTemplate>
      ),
      path: "/",
      errorElement: <FallbackUI />
    },
  ] : [
    {
      element: (
        <Suspense fallback={<div>Loading ...</div>}><LoginUser /></Suspense>
      ),
      path: '/',
      errorElement: <FallbackUI />
    }
  ];

  const router = createBrowserRouter(routes);

  return  <RouterProvider router={router} />
}

export default RouteApp