import React, { useState,useEffect } from 'react'
import './UserProfile.css'
import {setCredentials} from  '../slices/authSlice'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {Form} from 'react-bootstrap'
import { useUpdateUserMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'
function AdminProfileUpdate({user,onSave}) {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
    
  const [isEditing,setIsEditing] = useState(false)

  const [updateProfile,{isLoading}] = useUpdateUserMutation()
  const dispatch = useDispatch()

  useEffect(()=>{
    setUsername(user.username)
    setEmail(user.email)
    setPhoneNumber(user.phoneNumber)
  },[user])


  const submitHandiler = async(e)=>{
    e.preventDefault()
   try{
     if(phoneNumber.toString().length !==10){  
       console.log(phoneNumber,'numberrrrrrrrrrrrrrrrrrrrrrrr');
      toast.error('invalid phonenumber')
     }else{
      const res = await updateProfile({
        _id:user._id,
        username:username,
        email:email,
        phoneNumber:phoneNumber
      }).unwrap()
      dispatch(setCredentials({...res}))
      toast.success('profile updated')
      setIsEditing(false)
       onSave()
     }
   }catch(err){
    console.log(err);
    toast.error(err)
   }
  }
    
  return (
    <div className='profile'>

        <div className='avathar'>
      <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6103bba4-6e00-4e32-ac73-30ab1bdc42aa/desd6l0-1fabd516-bce8-4d7e-ad79-31ce811fd78c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzYxMDNiYmE0LTZlMDAtNGUzMi1hYzczLTMwYWIxYmRjNDJhYVwvZGVzZDZsMC0xZmFiZDUxNi1iY2U4LTRkN2UtYWQ3OS0zMWNlODExZmQ3OGMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.x76vYyZVpGM2cBRmcRK7dmg6lu7S14grddsuw7qGFAQ" alt="avathar" />
        </div>

        <Form.Control className='profile-inputBox'
           type='text'
           placeholder='Username' 
           value={username}
           onChange={(e)=>{setUsername(e.target.value)}}
           disabled={!isEditing}
          ></Form.Control>


        <Form.Control className='profile-inputBox'
           type='email'
           placeholder='Email ID' 
           value={email}
           onChange={(e)=>{setEmail(e.target.value)}}
           disabled={!isEditing}
          ></Form.Control>

         <Form.Control className='profile-inputBox'
           type='text'
           placeholder='PhoneNumber' 
           value={phoneNumber}
           onChange={(e)=>{setPhoneNumber(e.target.value)}}
           disabled={!isEditing}
          ></Form.Control>

         {isEditing?<button onClick={submitHandiler} className='profile-Button'>Save</button>:<button onClick={()=>setIsEditing(!isEditing)} className='profile-Button'>Edit</button>}
        
    </div>
  )
}

export default AdminProfileUpdate
