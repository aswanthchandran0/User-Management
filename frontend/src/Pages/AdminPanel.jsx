import React, { useState } from 'react'
import AdminNavbar from '../Components/AdminNavbar'
import Users from '../Components/Users'
import './AdminPanel.css'
import AdminProfileUpdate from '../Components/AdminProfileUpdate';
import { ToastContainer } from 'react-toastify';
function AdminPanel() {

  const [editUser, setEditUser] = useState(null);
  const [searchTerm,setSearchTerm]= useState('')
  const handleEditUser = (user) => {
    setEditUser(user);
  };

  const handleProfileUpdate = () => {
    setEditUser(null);
  };

  const handleSearch =(term)=>{
    setSearchTerm(term)
  
  }

  return (
    <div className='adminPage'>
       <ToastContainer/>
   <AdminNavbar onSearch={handleSearch}/>

    {editUser ? (
        <AdminProfileUpdate user={editUser} onSave={handleProfileUpdate} />
      ) : (
        <Users onEditUser={handleEditUser} searchTerm={searchTerm} />
      )}
    </div>
  )
}

export default AdminPanel
