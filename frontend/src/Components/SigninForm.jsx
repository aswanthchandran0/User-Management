import React, { useState,useEffect } from 'react'
import './SigninForm.css'
import { Form } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import {Link,useNavigate} from 'react-router-dom'




function SigninForm(props) {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  const [password,setPassword] = useState('')
  const [rePassword,setRePassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch() 
  const [register,{isLoading}] = useRegisterMutation()
  const {userInfo} = useSelector((state)=>state.auth)
  
  useEffect(()=>{
    if(userInfo){  
       navigate('/')
    }
  },[navigate,userInfo ])

  const submitHandiler = async(e)=>{
    try{
  
      e.preventDefault()

      if(phoneNumber.length !==10){
        toast.error('enter valid phoneNumber')
      }

     if(password !==rePassword){
         toast.error('passwords do not match')
      }else{
        try{
          const res = await register({username,email,phoneNumber,password}).unwrap()
          dispatch(setCredentials({...res}))
          navigate('/')

        }catch(err){
          toast.error(err?.data?.message || err.error);
        }
      }

    }catch(err){
      console.log(err);

    }
  }
  
  return (
    <div className='signupForm'>
    <h1>Sign up</h1>
    <Form>
    <Form.Control className='signup-inputBox'
           type='text'
           placeholder='username' 
           value={username}
           onChange={(e)=>{setUsername(e.target.value)}}
          ></Form.Control>


    <Form.Control className='signup-inputBox'
           type='email'
           placeholder='Email ID' 
           value={email}
           onChange={(e)=>{setEmail(e.target.value)}}
          ></Form.Control>
  
  <Form.Control className='signup-inputBox'
           type='text'
           placeholder='PhoneNumber' 
           value={phoneNumber}
           onChange={(e)=>{setPhoneNumber(e.target.value)}}
          ></Form.Control>

<Form.Control className='signup-inputBox'
           type='text'
           placeholder='Password' 
           value={password}
           onChange={(e)=>{setPassword(e.target.value)}}
          ></Form.Control>

<Form.Control className='signup-inputBox'
           type='password'
           placeholder='Conform Password' 
           value={rePassword}
           onChange={(e)=>{setRePassword(e.target.value)}}
          ></Form.Control>
      <p onClick={()=>props.toggle()} className='login'> login?</p>
    <button onClick={submitHandiler}  type='submit' className='SignupButton'>Signup</button>
    </Form>
</div>
  )
}

export default SigninForm
