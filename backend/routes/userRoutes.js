import express from 'express'
import checkUserStatus from '../middleware/checkUserStatus.js'
const router = express.Router()
import { authUser, 
    signUpUser,
    logoutUser,
    getUserProfile,
    updateUserProfile } from '../Controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'
router.post('/auth',authUser)
router.post('/signup',signUpUser)
router.post('/logout',logoutUser)
router
.route('/profile')
.get(protect,checkUserStatus,getUserProfile)
.put(protect,checkUserStatus,updateUserProfile)



export default router