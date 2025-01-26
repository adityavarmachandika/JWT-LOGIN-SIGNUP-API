const asynchandler=require("express-async-handler")

const loginauth= asynchandler(
    async(req,res)=>{
        res.status(200).send("hello from loginauth")
    
    }
) 

const signupauth=asynchandler(
    async (req,res)=>{
        res.status(200).send("hello from loginauth")
    }
)


module.exports={loginauth,signupauth}