import React, { useState,useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {Form} from 'react-bootstrap'
import { useLoginMutation } from '../slices/usersApiSlice'
import {setCredentials} from  '../slices/authSlice'
import './LoginForm.css'
import { toast } from 'react-toastify'
function LoginForm(props) {
  const [email,setEmail] = useState('')
  const [password,setPassword]= useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login,{isLoading}] = useLoginMutation()
  const {userInfo} = useSelector((state)=>state.auth)

  useEffect(()=>{
    if(userInfo){  
       navigate('/')
    }
  },[navigate,userInfo ])


  const submitHandiler = async(e)=>{
    e.preventDefault()
   try{
    const res = await login({email,password}).unwrap()
    dispatch(setCredentials({...res}))
    navigate('/')
   }catch(err){
       toast.error(err?.data?.message || err.error);
   }
  }
   
  return (
    <div className='loginForm'>
         <h1>Login</h1>
         <Form onSubmit={submitHandiler}>
          <Form.Control className='inputBox'
           type='email'
           placeholder='Email ID' 
           value={email}
           onChange={(e)=>{setEmail(e.target.value)}}
          ></Form.Control>

          <Form.Control className='inputBox'
           type='password'
           placeholder='Password' 
           value={password}
           onChange={(e)=>{setPassword(e.target.value)}}
          ></Form.Control>

           <p onClick={()=>props.toggle()} className='signup'> signup?</p>
         <button type='submit' className='loginButton'>Login</button>
         </Form>
    </div>
  )
}

export default LoginForm
