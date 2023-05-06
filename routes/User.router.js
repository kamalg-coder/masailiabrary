const express=require('express')
const jwt=require('jsonwebtoken')
const UserModel = require('../model/user.model')
const UserRouter=express.Router()
const bcrypt=require('bcrypt')


 UserRouter.post('/api/register',async(req,res)=>{
    const {name,email,password,isAdmin}=req.body
    const userRgstrd=await UserModel.find({email})
    if(userRgstrd.length>0){
        res.status(500).send("User Already Registered")
    }else{
        try {
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err) res.status(500).send({msg:"Something Went Wrong"})
                else{
                    const user=new UserModel({name,email,password:hash,isAdmin:true})
                    await user.save()
                    res.status(201).send("User has been registered")
                }
            })
        } catch (error) {
            res.status(400).send({error:error.message})
        }
    }
})

  UserRouter.post("/api/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
          const user = await UserModel.find({email})
          if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                let token = jwt.sign({userID:user[0]._id},"masai")  
                res.send({"msg":"Login Successful",token:token})  ;
                }else{
                    res.send({"msg":"Wrong Credentials"})
                }
            });
          } else{
            res.send({"msg":"Wrong Credentials"})
          }
    } catch (err) {
        res.send ({"msg":"Something went wrong",error:err.message})
    }
 })



module.exports={UserRouter}