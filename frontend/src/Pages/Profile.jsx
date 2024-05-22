import React from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import UserProfile from '../Components/UserProfile'
import NavBar from '../Components/Navbar'
import { ToastContainer } from 'react-toastify';
function Profile() {
  return (
    <div className='profilePage'>
      <ul className='profile-nav-links'>
      <li><Link to='/'>HomePage</Link></li>
      </ul>
      <ToastContainer/>
        <UserProfile/>
    </div>
  )
}

export default Profile
