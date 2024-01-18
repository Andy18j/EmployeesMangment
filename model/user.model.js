const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
     Email :{type:String,required:true},
    Password :{type:String,required:true},
     Confirm_Password:{type:String,required:true}
})


const userModel = mongoose.model("user",userSchema)


module.exports ={
    userModel
}