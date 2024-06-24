import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom'
import { Cart } from "./pages/Cart/Cart";
import { Error as ErrorPage } from "./pages/Error/Error";
import { Layout } from './Layout/Menu/Layout.tsx'
import { Product } from './components/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import { AuthLayout } from './Layout/Auth/AuthLayout.tsx';
import { Register } from './pages/Register/Register.tsx';
import { Login } from './pages/Login/Login.tsx';
import { RequireAuth } from './helpers/RequireAith.tsx';

const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Layout /></RequireAuth>,
    children: [
      {
        path: '/',
        element: <Suspense fallback={<>Loading menu...</>}><Menu /></Suspense>
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <>Error</>,
        loader: async ({ params }) => {
          return defer({
            data: axios.get(`${PREFIX}/products/${params.id}`).then(data => data).catch(error => error)
          })
        }
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout/>,
    children: [
      {
        path: 'register',
        element: <Register/>,
      },
      {
        path: 'login',
        element: <Login/>,
      },
    ]
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
