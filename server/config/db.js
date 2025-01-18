const mongoose = require('mongoose')
const colors=require('colors')
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connect To Database ${mongoose.connection.host}`.bgBlack.green)
    }
    catch (err)
    {
        console.log(`There is an error ${err}`.bgBlack.red)
    }
}

module.exports=connect