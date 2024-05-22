import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import admin from '../models/adminModel.js'

const protect = asyncHandler(async (req,res,next)=>{
    const token = req.cookies.jwt
    if(token){
          try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.userId).select('-password')
        next()
          }catch(error){
        res.status(401)
        throw new Error('Not authorized, invalid token')
          }
    }else{
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const adminProtected = asyncHandler(async(req,res,next)=>{
  const token = req.cookies.admin_jwt
  if(token){
    try{
const decoded = jwt.verify(token,process.env.ADMIN_SECRET)
req.admin = await admin.findById(decoded.adminId)
next()
    }catch(err){
      res.status(401)
      throw new Error ('Not authorized, invalid token')
    }
  }else{
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export {protect,adminProtected}