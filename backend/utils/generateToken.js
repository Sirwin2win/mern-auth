import jwt from "jsonwebtoken"
// You can add sth into the payload i.e userId
// we need the userId when we validate the token
// so that we can be able to pull out the user profile with the id
const generateToken = (res, userId) =>{
    // creating the token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d' // How long you want it to last
    })

    // Let's save the created token in a cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',// if set to true, would only use https, but will use https on production
        sameSite: 'strict',// To prevent CSRF attack
        maxAge: 30 * 24 * 60 * 60 * 1000 // When this expires
    })
}

export default generateToken