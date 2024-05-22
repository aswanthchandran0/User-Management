import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar,Nav,Container,NavDropdown,Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
function NavBar() {
  const {userInfo} = useSelector((state)=>state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall]= useLogoutMutation()

  const logoutHandler = async ()=>{
    try{
    await logoutApiCall().unwrap()
    dispatch(logout())
    navigate('/login')
    }catch(err){
      console.log(err);
    }
  }

  
  return (
    <div className='navbar'>

      <ul className='nav-links'>
        <li><Link to='/'>HomePage</Link></li>
      </ul>
      {userInfo ?(<>
     <Link to='/profile'><button className='logout'>Profile</button></Link>
      <button onClick={logoutHandler} className='profileButton'>logout</button>
        
      </>): (
        <>
        <Link to='/login'><button className='profileButton'>login</button></Link>
        </>
      )}
     
    </div>
  )
}

export default NavBar