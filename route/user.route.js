const express = require("express")
const {userModel} = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const userRouter = express.Router()

userRouter.post("/signup",async(req,res)=>{
    try {
        const {Email,Password, Confirm_Password} = req.body
        
        const user = await userModel.findOne({Email})
        if (user) {
          return res.status(204).json({msg:"this user is already present!! please Login "})
        }
        const hash = await bcrypt.hash(Password,6)

        const newUser = new userModel({Email,Password:hash,Confirm_Password:hash})
        await newUser.save()
        res.status(201).json({msg:"Singup Sucessfully...🥳"})

   }
   catch(err){
      res.status(501).json({msg:"Something Went Wrong to Ragisterd User.."})
      console.log(err)
   }
})




userRouter.post("/login",async(req,res)=>{
    try{
        const {Email,Password} = req.body

        const isuserpresent = await userModel.findOne({Email})

        if (!isuserpresent) return res.status(501).json({msg:"user not present!! please signUp"})

        const ispasscorrect = await bcrypt.compare(Password,isuserpresent.Password)

        const token =  jwt.sign({userId:isuserpresent._id},process.env.private_key,{
            expiresIn:"8min"
        })
        if (ispasscorrect){
            return res.status(201).json({msg:"Login Sucessfully🥳 ",token})
        }else{
            res.status(501).json({msg:"Invalid credentials"})
        }
    }
    catch(err){
        console.log(err,err)
        res.status(501).json({msg:"Invalid credentials"})
        }
})





module.exports = {
    userRouter
}