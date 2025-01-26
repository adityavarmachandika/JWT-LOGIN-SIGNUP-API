const express= require('express')
const userroutes= require('./routes/userroutes')
const { errorhandler } = require('./middleware/errorhandler')
const dbconnect=require('./config/dbconnect')
const app=express()

dbconnect()
port=9000
app.use(express.json())

app.use("/userauth",userroutes)
app.use(errorhandler)

app.get('/',(req,res)=>{
    res.status(200).send("hello")
})
app.use(errorhandler)

app.listen(port,()=>{
    console.log("server is running at 9000")
})