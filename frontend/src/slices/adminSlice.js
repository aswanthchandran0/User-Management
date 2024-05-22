import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const initialState = {
    adminInfo:localStorage.getItem("adminInfo")?
    JSON.parse(localStorage.getItem("adminInfo")):null
}

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        setAdminInfo:(state,action)=>{
            state.adminInfo= action.payload;
            localStorage.setItem("adminInfo",JSON.stringify(action.payload))
        },
        logoutAdmin:(state,action)=>{
            state.adminInfo = null,
            localStorage.removeItem('adminInfo')
        }
    }
})

export const  {setAdminInfo,logoutAdmin} = adminSlice.actions
export default adminSlice.reducer