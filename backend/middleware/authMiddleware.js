import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// This fn below will protect routes so that you have 
// to be logged in before you can access them 
const protect = asyncHandler(async(req, res, next) =>{
    let token;

    token = req.cookies.jwt

    // checking for the token
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // The decoded object above should have userId in it
            // NB .select('-password') means not to return password
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
          res.status(401) 
          throw new Error('Not authorized, invalid token') 
        }
    }else{
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})
// we are not exporting as defailt because we might be adding some other middleware
export { protect }