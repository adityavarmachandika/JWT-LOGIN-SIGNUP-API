const jwt= require("jsonwebtoken")
const asynchandler = require("express-async-handler")
const userschema=require("../models/userdatabase")
const protect=asynchandler(
    async (req,res,next)=>{

        let token
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            try{
                token=req.headers.authorization.split(' ')[1]
    
                const decode_token=jwt.verify(token,process.env.JWT_SECRET)
                const userdata= await userschema.findById(decode_token.id).select('-password')
                req.user=userdata
                next()
            }
            catch(err){
                console.log(error)
                res.status(401)
                throw new Error('not authorized')
            }
        }
    }
)

module.exports=protect