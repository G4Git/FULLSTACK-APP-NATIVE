const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please add name"],
        trim:true
    }
    , email: {
        type: String,
        required: [true,"Please add email"],
        unique: true,
        trim:true
    }
    ,
    password: {
        type: String,
        required: [true, "Please add password"]
        , min: 6,
        max:10
    }
    , role: {
        type: String,
        default:"user"
    }
})

module.exports=mongoose.model("users",userSchema)
