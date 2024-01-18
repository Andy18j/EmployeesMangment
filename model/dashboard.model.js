const mongoose = require("mongoose")

const dashboardSchema = mongoose.Schema({
  FirstName :{type:String,required:true},
  LastName  :{type:String,required:true},
  Email     :{type:String,required:true},
  Department :{type:String,enum:["Tech","Marketing","Operations"],required:true},
  Salery : {type:Number,required:true},
})


const dbModel = mongoose.model("dashboard",dashboardSchema)


module.exports = {
    dbModel
}