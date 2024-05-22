import React, { useState,useEffect,useRef } from 'react'
import './UserProfile.css'
import {setCredentials} from  '../slices/authSlice'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {Form} from 'react-bootstrap'
import { useUpdateUserMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'
import { storage } from '../firebase/firebase'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'

function UserProfile() {
  const {userInfo} = useSelector((state)=>state.auth)
  const [username,setUsername] = useState(userInfo.username)
  const [email,setEmail] = useState(userInfo.email)
  const [phoneNumber,setPhoneNumber] = useState(0)
  const [isEditing,setIsEditing] = useState(false)
  const [selectedImage,setSelectedImage] = useState(null)
  const [profileImageUrl,setProfileImageUrl] = useState('')
  const [updateProfile,{isLoading}] = useUpdateUserMutation()
  const dispatch = useDispatch()
  const fileInputRef = useRef(null)
  console.log('selected image',selectedImage);
  useEffect(()=>{
    console.log(userInfo,'...........');
      setUsername(userInfo.username)
      setEmail(userInfo.email)
      setPhoneNumber(userInfo.phoneNumber)
     const fetchImage = async ()=>{
      try{
        const imageRef = ref(storage, `profileImage/${userInfo._id}`);
        const imageUrl = await getDownloadURL(imageRef);
       setProfileImageUrl(imageUrl)

      }catch(err){
        console.log(err);
      }

    }
     fetchImage()
  },[])
console.log('profile image url',profileImageUrl);
 const handleImageChange = (e)=>{
  if(e.target.files[0]){
    setSelectedImage(e.target.files[0])
  }
 }
 const handleImageUpload = async()=>{
  if(selectedImage){
    const imageRef = ref(storage,`profileImage/${userInfo._id}`)
    await  uploadBytes(imageRef,selectedImage)
    const imageUrl = await getDownloadURL(imageRef)
    setProfileImageUrl(imageUrl)
  }
 }


  const submitHandiler = async(e)=>{
    e.preventDefault()
   try{
    await handleImageUpload()
     if(phoneNumber.toString().length !==10){  
      toast.error('invalid phonenumber')
     }else{
      const res = await updateProfile({
        _id:userInfo._id,
        username:username,
        email:email,
        phoneNumber:phoneNumber
      }).unwrap()
      dispatch(setCredentials({...res}))
      toast.success('profile updated')
      setIsEditing(false)
     }
   }catch(err){
    console.log(err);
    toast.error(err)
   }
  }
    
  return (
    <div className='profile'>

        <div className='avathar'>
       <img src={profileImageUrl?profileImageUrl:"https://i.pinimg.com/736x/f8/84/7b/f8847b5a92b0e321d6df26ebaee9b39c.jpg"} onClick={()=> fileInputRef.current && fileInputRef.current.click()} alt="" />
           <input type="file" ref={fileInputRef}   disabled={!isEditing} style={{display:'none'}} onChange={handleImageChange}/>
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

export default UserProfile
