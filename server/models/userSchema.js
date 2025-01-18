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
        max:6
    }
    , role: {
        type: String,
        default:"user"
    }
}, { timestamps: true })

module.exports=mongoose.model("User",userSchema)
