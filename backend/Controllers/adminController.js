import asyncHandler from 'express-async-handler'
import admin from '../models/adminModel.js'
import User from '../models/userModel.js'
import generateAdminToken from '../utils/adminTokenGenerate.js'

// @des admin login
// route POST /api/admin/login
// @access public


const adminLogin = asyncHandler(async(req,res)=>{
    const {email,password} = req.body

    const Admin =await admin.findOne({email:email})
    console.log(Admin);
    if(Admin && Admin.password == password){
        generateAdminToken(res, Admin._id);
        res.status(200).json({_id:Admin.id,email:Admin.email,})
    }else{
        res.status(401).json('access denied')
    }
})

// @des get user
// route GET /api/admin/ 
// @access private

const getUser = asyncHandler(async(req,res)=>{
    const users = await User.find()
    res.status(200).json(users)
 })

// @des  updateUser
// route POST /api/admin/
// @access private

const updateUser  = asyncHandler(async(req,res)=>{
    const {userId} = req.body
    const user = await User.findById(userId)
    if(user){
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber
        const updatedUser = await user.save()
        console.log(updatedUser);
        res.status(200).json({
            _id:updatedUser._id,
            username:updatedUser.username,
            phoneNumber:updatedUser.phoneNumber,
        })
    }else{
        res.status(404)
        throw new Error('user Not found')
    }

})

// @des  deleteUser
// route GET /api/admin/
// @access private

const deleteUser = asyncHandler(async(req,res)=>{
    console.log('request was reachedin fsdf');
    const userId = req.params.userId
    console.log(userId);
    const user = await User.findById(userId)

    if(user){
      User.deleteOne({_id:userId}).then(result =>{
        if(result.deletedCount === 1){
            res.status(200).json('user successfully deleted')
        }else{
           res.status(404).json('user not found')
        }
      })

    }else{
        res.status(404).json('user not found')
    }
})

// @des  searchUser
// route GET /api/admin/search
// @access private

const searchUser = asyncHandler(async(req,res)=>{
    res.status(200).json('search user')
})




// @des  block user
// route POST /api/admin/block
// @access private
const blockUser = asyncHandler(async(req,res)=>{
    const {userId} = req.body
    
    const user =await User.findById(userId)
    if(user){
        user.toggleBlockStatus()
        res.status(200).json(`user blocked ${user.isBlocked}`)
    }else{
        res.status(404).json('user not found')
    }
})

// @desc logout user
// route POST /api/admin/logout
// @access Public
const adminLogout= asyncHandler(async (req,res) => {
    res.cookie('admin_jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:'admin logged out'})
})

export {
    adminLogin,
    getUser,
    updateUser,
    deleteUser,
    searchUser,
    blockUser,
    adminLogout
}