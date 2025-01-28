const express=require("express")
const {loginauth,signupauth,getuserdata}=require("../controllers/userauth")
const protect= require("../middleware/authmiddle")
const router=express.Router()

router.get("/login",(req,res)=>{res.status(200).send("hello for login page")})



router.post("/login",loginauth)
router.post("/signup",signupauth)
router.get("/getuserdata",protect,getuserdata)
module.exports=router

