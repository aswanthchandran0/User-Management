import express from 'express'
import { adminProtected } from '../middleware/authMiddleware.js'
import  { 
    adminLogin,
    getUser,
    updateUser,
    deleteUser,
    searchUser,
    blockUser,
    adminLogout
} from '../Controllers/adminController.js'

const router = express.Router()

router.post('/login',adminLogin)
router.route('/').get(adminProtected,getUser).put(adminProtected,updateUser)
router.delete('/:userId', adminProtected, deleteUser);
router.get('/search',adminProtected,searchUser)
router.post('/block',adminProtected,blockUser)
router.post('/logout',adminLogout)


export default router