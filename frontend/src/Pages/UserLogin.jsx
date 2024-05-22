import React, { useState } from 'react'
import LoginForm from '../Components/LoginForm'
import './UserLogin.css'
import SigninForm from '../Components/SigninForm'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function UserLogin() {
  const [showSignup,setShowSignup] = useState(false)

const handleSignupClick = () =>{
  setShowSignup(!showSignup)
}
  return (
    <div className='loginPage'>
      <ToastContainer/>
   {
    showSignup? <SigninForm toggle={handleSignupClick} />:<LoginForm toggle={handleSignupClick}/> 
   
     
   }
    </div>
  )
}

export default UserLogin
