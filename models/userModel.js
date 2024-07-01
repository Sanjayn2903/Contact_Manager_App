const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"please add the user name"]
    },
    email:{
        type:String,
        required:[true,"please add the email"],
        unique:[true,"Email address is already taken"]
    },
    password:{
        type:String,
        required:[true,"please add the password"]
    },
},
    {
        timestamp:true,
    },
)


module.exports = mongoose.model("users",userSchema);