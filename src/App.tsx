import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.scss'
import Navbar from './components/Navbar/Navbar'
import { useEffect } from 'react'

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if(location.pathname === '/') {
      // navigate('/movies')
    }
  },[location.pathname])
  
  return (
    <div className='container site-bg-color'>
      <Navbar />
      <section>
        <Outlet />
      </section>
    </div>
  )
}

export default App
