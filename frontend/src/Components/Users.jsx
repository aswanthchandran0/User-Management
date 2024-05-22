import React, { useEffect, useState } from 'react'
import './Users.css'
import {Row,Col}  from 'react-bootstrap'
import axios  from 'axios'
import { ADMIN_URL } from '../slices/adminAxios'
import { adminBlock } from '../slices/adminAxios'
import { adminDelete } from '../slices/adminAxios'
function Users({onEditUser,searchTerm}) {
    const [userData,setUserData] = useState([])
    useEffect(()=>{
        
        const fetchData = async()=>{
    try{ 
    const response = await axios.get(`${ADMIN_URL}`)
    setUserData(response.data)
    }catch(err){
      throw new Error(err)
    }  
  }
   
  fetchData()
  
    },[userData])

console.log('search term',searchTerm);

    const filteredUsers = searchTerm.trim('')
    ? userData.filter((user) => {
        return user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())
      })
    : userData

  
  return (
    <div className='userCard'>
      <div className='users'>
      
<table class="styled-table">
    <thead>
        <tr>
            <th>UserName</th> 
            <th>Email</th>
            <th>PhoneNumber</th>
            <th>Status</th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {
          filteredUsers.map(user =>(
            <tr>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.isBlocked?'true':'false'}</td>
             <td><button className='action'  style={{ backgroundColor: user.isBlocked ? 'red' : 'green' }} onClick={()=>adminBlock({userId:user._id})}>{user.isBlocked ? 'Unblock' : 'Block'}</button></td>
             <td><button className='updateButton' onClick={() => onEditUser(user)}>Update</button></td>
             <td><button className='deleteButton' onClick={()=>adminDelete({userId:user._id})}>Delete</button></td>
            </tr>
          ))
        }
     
    </tbody> 
</table>

  
      </div>
    </div>
  )
}

export default Users
