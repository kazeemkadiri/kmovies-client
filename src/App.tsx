import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.scss'
import Navbar from './components/Navbar/Navbar'
import { useEffect } from 'react'
import Loader from './components/Loader/Loader'
import { useAppSelector } from './hooks/useStore'
import { RootState } from './redux/store'
import SearchMovies from './components/SearchMovies/SearchMovies'
import { toast } from 'react-toastify'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const loader = useAppSelector((state: RootState) => state.loader)

  useEffect(() => {
    if(location.pathname === '/') {
      navigate('/movies')
    }

    toast.dismiss();
  },[location.pathname])
  
  return (
    <>
      <div className='container site-bg-color'>
        <Navbar />
        <SearchMovies />
        <br />
        <section>
          <Outlet />
        </section>
      </div>
      {
        loader.show && <Loader />
      }
    </>
  )
}

export default App
