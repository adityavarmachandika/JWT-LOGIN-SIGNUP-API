const express=require("express")
const {loginauth,signupauth}=require("../controllers/userauth")

const router=express.Router()

router.get("/login",(req,res)=>{res.status(200).send("hello for login page")})



router.post("/login",loginauth)
router.post("/signup",signupauth)

module.exports=router

