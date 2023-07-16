import asyncHandler from 'express-async-handler' 
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'


// @desc Auth user/set token
// route POST /api/users/auth
// @access public
const authUser = asyncHandler( async  (req, res)=>{
    const { email, password } = req.body
    const user = await User.findOne({email})
    
    // Checking if user was created
 if(user && user.matchPassword(password)){
    generateToken(res, user._id)
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email 
    })
    // if there's no user, then else
 }else{
    res.status(401)
    throw new Error('Invalid email or password')
 }
})


// @desc Register a new User
// route POST /api/users
// @access public
const registerUser = asyncHandler( async  (req, res)=>{
    const { name, email, password } = req.body
    const userExists = await User.findOne({email })
    // checking if user exists
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
// creating User on the database
    const user = await User.create({
       name,
       email,
       password 
    })
// Checking if user was created
 if(user){
    generateToken(res, user._id)
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email
    })
    // if there's no user, then else
 }else{
    res.status(400)
    throw new Error('Invalid user data')
 }
})



//// @desc Logout user
// route POST /api/users/logout
// @access public
const logoutUser = asyncHandler( async  (req, res)=>{
    // To logout User, set jwt token to nothing
    // and expiry date to new date = 0
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0) 
    })
    res.status(200).json({message: 'User logged out' })
})


//// @desc GET user profile
// route GET /api/users/profile
// @access private
const getUerProfile = asyncHandler( async  (req, res)=>{
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    
    res.status(200).json(user)
})


//// @desc Update user   profile
// route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler( async  (req, res)=>{
    const user = await User.findById(req.user._id)
 // checking if user exists
 if(user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if(req.body.password){
        user.password = req.body.password
    }
   const updatedUser =  await user.save()
   res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
   })
 }  else{
    res.status(404)
    throw new Error('User not found')
 } 
})

export { 
    authUser, 
    registerUser,
    logoutUser,
    getUerProfile,
    updateUserProfile
 }