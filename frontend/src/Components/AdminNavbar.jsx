import React, { useState } from 'react'
import './AdminNavbar.css'
import AdminLogin from '../Pages/AdminLogin'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLogout } from '../slices/adminAxios'
import { logoutAdmin } from '../slices/adminSlice'


function AdminNavbar({onSearch}) {
 
  const {AdminInfo} = useSelector((state)=>state.admin)
  const [searchTerm,setSearchTerm] = useState('')

const dispatch = useDispatch()
const navigate = useNavigate()

const logoutHandler = async()=>{
  try{
    console.log('request was reached in there');
   await adminLogout()
   dispatch(logoutAdmin())
   navigate('/adminLogin')
  }catch(err){

    console.log(err);
  }
}

const handleSearchTerm = (e)=>{
   setSearchTerm(e.target.value)
     onSearch(e.target.value)
}

  return (
    <div className='admin-navbar'>

    <ul  className='nav-links'>
      <li>AdminPanel</li>
    </ul>

    <div class="search-container">
  <i class="fas fa-search search-icon"></i>
  <input class="search" value={searchTerm} onChange={handleSearchTerm} type="text" placeholder="Search" />
</div>


    <button onClick={logoutHandler} className='profileButton'>logout</button>
    

  </div>
  )
}

export default AdminNavbar
