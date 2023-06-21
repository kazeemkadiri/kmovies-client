import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/scss/bootstrap.scss'
import './index.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/home/home'
import FullMoviePage from './pages/fullMovie/FullMovie'
import SearchPage from './pages/search/search'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: 'movies',
        element: <HomePage />,
        children:[
          {
            path: "page/:pagenum",
            element: <HomePage />
          }
        ]
      },
      {
        path: "movie/:movieid",
        element: <FullMoviePage />
      },
      {
        path: "search/:searchquery",
        element: <SearchPage />,
      },
      {
        path: "genre/:genre",
        element: <SearchPage />
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
