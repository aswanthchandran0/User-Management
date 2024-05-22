import React from 'react'
import {Routes,Route} from 'react-router-dom'
import UserLogin from './Pages/UserLogin'
import HomePage from './Pages/HomePage'
import Profile from './Pages/Profile'
import PrivateRoute from './Components/PrivateRoute.jsx'
import AdminPanel from './Pages/AdminPanel.jsx'
import AdminLogin from './Pages/AdminLogin.jsx'
import AdminPrivateRoute from './Components/AdminPrivateRoute.jsx'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path='' element={<AdminPrivateRoute/>}>
        <Route path='/admin' element={<AdminPanel/>}/>
        </Route>
        <Route path='/adminLogin' element={<AdminLogin/>}/>
      </Routes>
     
    </div>
  )
} 

export default App
