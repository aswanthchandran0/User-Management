import React from 'react'
import AdminLoginForm from '../Components/AdminLoginForm'
import './AdminLogin.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminLogin() {
  return (
    <div className='admin-loginPage'>
      <ToastContainer/>
    <AdminLoginForm/>
    </div>
  )
}

export default AdminLogin
