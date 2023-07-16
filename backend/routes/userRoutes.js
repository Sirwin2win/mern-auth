import express from 'express'
import { authUser,
     registerUser,
    logoutUser,
    getUerProfile,
    updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

// To use { protect } on any route, put it as the first argument
const router = express.Router()

router.post('/', registerUser)  
router.post('/auth', authUser) 
router.post('/logout', logoutUser) 
router.route('/profile').get(protect, getUerProfile).put(protect, updateUserProfile) 


export default router