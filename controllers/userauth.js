const asynchandler=require("express-async-handler")
const loginschema=require("../models/userdatabase")
const argon2=require("argon2")
const { Aggregate } = require("mongoose")

const loginauth= asynchandler(
    async(req,res)=>{
        const data=req.body
        const {username,password}=data
        const userdata=await loginschema.findOne({username})
        if(!userdata)
            res.send("user not found")
        const ispassword_valid=await argon2.verify(userdata.password,password)
        ispassword_valid?res.send("welcome"):res.send("enter correct password")
    }
)
const signupauth=asynchandler(
    async (req,res)=>{
        const data=req.body
        const {username,password}=data
        if(!username || !password){
            return res.send("enter all the data")
        }
        const hashedpassword=await argon2.hash(password)
        const userlogin=new loginschema({username,password:hashedpassword})
        const saveduser=await userlogin.save()
        res.send(saveduser)
    }
)

module.exports={loginauth,signupauth}