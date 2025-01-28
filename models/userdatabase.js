const mongoose= require("mongoose")

const loginschema=mongoose.Schema({
    username:{
        type: String,
        required:[true,,"please enter a username value"]
    },
    password:{
        type:String,
        required:[true,"please enter a password value"]
    },
    createdat:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('loginschema',loginschema)
