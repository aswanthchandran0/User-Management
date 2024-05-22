import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
// @desc Auth user/set token
// route POST /api/users/auth
// @access Public

const authUser = asyncHandler(async (req,res) => {
     const {email,password} = req.body
     const user = await User.findOne({email})
      if(user.isBlocked){
        res.status(401)
        throw new Error('account blocked ')
      }
   else if(user && (await user.matchPassword(password))){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            username:user.username,
            email:user.email,
            phoneNumber:user.phoneNumber
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
     
})

// @desc sign up  a new user
// route POST /api/signup
// @access Public
const signUpUser = asyncHandler(async (req,res) => {
    const {username,email,phoneNumber,password} = req.body
    const userExist = await User.findOne({email})
          console.log(userExist);
    if(userExist){
        res.status(400);
        throw new Error('user already exists')
    }
    const user = await User.create({
        username,
        email,
        phoneNumber,
        password
    })

    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            username:user.username,
            email:user.email,
            phoneNumber:user.phoneNumber
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc logout user
// route POST /api/logout
// @access Public
const logoutUser= asyncHandler(async (req,res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:'user logged out'})
})

// @desc Get user profile
// route GET /api/users/profile
// @access Private
const getUserProfile= asyncHandler(async (req,res) => {
    const user = {
        username:req.user.username,
        email:req.user.email,
        phoneNumber:req.user.phoneNumber
    }
    res.status(200).json(user)
})

// @desc Update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile= asyncHandler(async (req,res) => {
    console.log(req.body,'bodyyy');
   const user = await User.findById(req.user.id)
   if(user){
  user.username = req.body.username || user.username
  user.email = req.body.email || user.email
  user.phoneNumber = req.body.phoneNumber || user.phoneNumber

  if(req.body.password){
    user.password = req.body.password
  }
 const updatedUser =  await user.save()
 res.status(200).json({
    _id: updatedUser._id,
    username:updatedUser.username,
    email:updatedUser.email,
    phoneNumber:updatedUser.phoneNumber
 })
   }else{
    res.status(404)
    throw new Error('user not found')
   }
})



export {
    authUser,
    signUpUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
}