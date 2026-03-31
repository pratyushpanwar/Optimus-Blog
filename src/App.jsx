import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { useState, useEffect} from 'react'
import { Header, Footer } from './components'
import { login, logout } from "./store/authSlice"
import { Outlet } from "react-router-dom"

function App() {
  const [loading, setLoading] = useState()
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => userData? 
        dispatch(login(userData)): 
        dispatch(logout()))

    .finally(() => setLoading(false))

  }, []);
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO: <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
