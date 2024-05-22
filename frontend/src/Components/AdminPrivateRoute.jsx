import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react'

function AdminPrivateRoute() {
    const {adminInfo} = useSelector((state)=>state.admin)
    return adminInfo?<Outlet/>:<Navigate to='adminLogin' replace/>
  return (
    <div>
      
    </div>
  )
}

export default AdminPrivateRoute
