//4
const mongoose = require("mongoose");

const userschema = mongoose.Schema({
    username : {
        type : String,
        required : [true, "please add the user name"],
    },
    email : {
        type : String,
        required : [true, "please add the email id"],
        unique: [true, "Email address already exits"]
    },
    password : {
        type : String,
        required: [true, "please add users password"],
    },
}, 
{
    timestamps : true
})

module.exports = mongoose.model("users", userschema);