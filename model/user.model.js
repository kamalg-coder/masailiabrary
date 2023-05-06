const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean
},{
    versionKey:false
})
let UserModel=mongoose.model('User',userSchema)

module.exports=UserModel