import './App.css'
import authService from './appwrite/auth'
import {useDispatch} from "react-redux"
import {login, logout} from "./store/authSlice"
import { useEffect, useState } from 'react'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const diapatch = useDispatch()

  useEffect(()=>{
     authService.getCurrUser().
     then((userData)=>{
      if(userData){
        diapatch(login({userData}))
      }else {
        diapatch(logout())
      }
     })
     .finally(() => setLoading(false))
  },[])

  return !loading ? (
<div className='min-h-screen flex flex-wrap content-between bg-gray-400 '>
      <div className='w-full block'>
        <Header />
        <main>
        TODO: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App