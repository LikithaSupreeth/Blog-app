// Fields: username , email , passwordHash , createdAt , updatedAt , profilePicture (optional), bio (optional).
const mongoose = require('mongoose')
const {Schema,model} = mongoose

const userSchema =  new Schema({
    userName:String,
    email:String,
    password:String,
    bio:String

},{timestamps:true})

const User = model('User',userSchema)
module.exports = User