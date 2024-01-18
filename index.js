const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
const { userRouter } = require("./route/user.route")
const { dbRouter } = require("./route/dashboard.route")
require("dotenv").config()



const app = express()
app.use(express.json())
app.use(cors())
app.use("",userRouter)
app.use("",dbRouter)

app.get("/",(req,res)=>{
    res.send("Welcome To The Employee Management")

})


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected TO The db")

    }
    catch(err){
        console.log(err)
        console.log("Not Connected TO the DB")
    }
    console.log(` PORT IS RUNNING ON THE ${process.env.port}`)
})