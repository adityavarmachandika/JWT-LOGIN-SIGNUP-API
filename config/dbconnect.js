const {mongoose} = require("mongoose")
require('dotenv').config();

const dbconnect=async ()=>{
    try{
        connection=await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected")
    }
    catch(error){
        console.log(error)
    }
}

module.exports=dbconnect