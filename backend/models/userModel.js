import mongoose from "mongoose"
import bcrypt from 'bcryptjs' 

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
},  {
    timestamps: true
})
// pre: means before we save, that means we want to run a function before we save
userSchema.pre('save', async function (next) {
  // If the password is not modified, we move on
    if(!this.isModified('password')){
    next()
  } 
 // if the password is modified , as we are creating it, we have to hash is
 // first create a salt(a key for hashing the password)

 const salt = await bcrypt.genSalt(10)
 // at this point, the password is still plain
 // that's why we are passing the salt for it to e hashed

 this.password = await bcrypt.hash(this.password, salt )  
  
})

// Comparing hashed and user-supplied password upon login
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User