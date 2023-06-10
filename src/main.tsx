import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/scss/bootstrap.scss'
import './index.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/home/home.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   path: '/movies',
      //   element: <HomePage />,
      //   children:[
      //     {
      //       path: "page/:pagenum",
      //       element: <HomePage />
      //     }
      //   ]
      // }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
