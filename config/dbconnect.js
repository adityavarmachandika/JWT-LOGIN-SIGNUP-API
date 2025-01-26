const {mongoose} = require("mongoose")
require('dotenv').config();

const dbconnect=async ()=>{
    try{
        nection=await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected")
    }
    catch(error){
        console.log(error)
    }
}

module.exports=dbconnect