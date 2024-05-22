import axios from 'axios'

export const ADMIN_URL = '/api/admin'

export const adminLogin =  async({email,password})=>{
    try{
   const response = await axios.post(`${ADMIN_URL}/login`,{email,password})
       return response.data
    }catch(err){
      throw new Error(err)
    }
}

export const adminLogout = async()=>{
  try{ 
    await axios.post(`${ADMIN_URL}/logout`)
  }catch(err){
    throw new Error(err)
  }
}

export const adminBlock = async({userId})=>{
  try{
    await axios.post(`${ADMIN_URL}/block`,{userId})
  }catch(err){
    console.log(err);
  }
} 

export const adminDelete = async({userId})=>{
  try{
    await axios.delete(`${ADMIN_URL}/${userId}`)
  }catch(err){
    console.log(err);
  }
}

export const adminUpdate = async()=>{
  
}