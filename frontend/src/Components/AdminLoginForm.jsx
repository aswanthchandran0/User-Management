import React, { useState,useEffect } from 'react'
import {Form} from 'react-bootstrap'
import './AdminLoginForm.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogin } from '../slices/adminAxios'
import { toast } from 'react-toastify'
import { setAdminInfo } from '../slices/adminSlice'

function AdminLoginForm() {
  const [email,setEmail] = useState('')
  const [password,setPassword]= useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {adminInfo} = useSelector((state)=>state.admin)
console.log('admin info',adminInfo);
    useEffect(()=>{
      if(adminInfo){  
        console.log(adminInfo);
         navigate('/admin')
      }
    },[navigate,adminInfo ])
  
  

    const submitHandiler = async (e)=>{
      try{
     e.preventDefault()
    const response = await adminLogin({email,password})
    console.log('response.......',response);
    dispatch(setAdminInfo(response))
    navigate('/admin')
      }catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message || err.message || 'An error occurred');
      }
    }
   

  return (
    <div className='admin-loginForm'>
         <h1>Admin</h1>
         <Form onSubmit={submitHandiler}>
          <Form.Control className='admin-inputBox'
           type='email'
           placeholder='Email ID' 
           value={email}
           onChange={(e)=>{setEmail(e.target.value)}}
          ></Form.Control>

          <Form.Control className='admin-inputBox'
           type='password'
           placeholder='Password' 
           value={password}
           onChange={(e)=>{setPassword(e.target.value)}}
          ></Form.Control>
         <button type='submit' className='admin-loginButton'>Login</button>
         </Form>
    </div>
  )
}

export default AdminLoginForm
