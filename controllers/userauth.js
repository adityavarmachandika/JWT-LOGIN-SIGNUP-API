const asynchandler=require("express-async-handler")
const loginschema=require("../models/userdatabase")
const argon2=require("argon2")
const jwt=require("jsonwebtoken")
const { Aggregate } = require("mongoose")

const loginauth= asynchandler(
    async(req,res)=>{
        const data=req.body
        const {username,password}=data
        const userdata=await loginschema.findOne({username})
        if(!userdata)
            return res.send("user not found")
        const ispassword_valid=await argon2.verify(userdata.password,password)
        if(ispassword_valid){
            const jwt_token= generate_jwt_token(userdata.id)
            res.json(
                {"jwt_token":jwt_token,
                 "username":userdata.username
                })
        }
        else{
            res.send("password in invalid")
        }

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

const getuserdata= asynchandler (async (req,res)=>{
    const {id,username}=await loginschema.findById(req.user.id)
    res.json({"username":username,"id":id})
}
)


const generate_jwt_token=(id)=>{

    //for the sign function in jwt the parameters are the paylod, secret key, options , callback
    const jwt_token= jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'5d'})
    return jwt_token
}
module.exports={loginauth,signupauth,getuserdata}