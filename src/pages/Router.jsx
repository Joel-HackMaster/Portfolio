import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import NavBarHeader from '../components/nav/NavBarHeader'
import Notification from '../components/ToastNotifications/Notification'

export default function Router() {
  return (
    <div className='h-full w-full flex justify-center'>
      <NavBarHeader/>
      <Routes>
        <Route path='/Dashboard' element={<Dashboard/>} />
      </Routes>
      <Notification/>
    </div>
  )
}
