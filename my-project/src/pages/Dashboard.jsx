import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from './Home'
export  const Dashboard = () => {
  return (
    <div className='flex flex-row h-screen  '>
        <Home/>
        
        <Outlet/>
    </div>
  )
}

