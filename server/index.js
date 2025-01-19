const express = require("express")
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan=require('morgan')
const router = express.Router()
const path =require('path')
const ConnectDB=require('./config/db')

// rest object
const app = express();

// dot env
dotenv.config();

// MONGO_URL
ConnectDB();


// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// PORT
const Port = process.env.PORT

// routes

app.use('/api/v1/auth',require('./routes/userRouter'))


// Server

app.listen(Port,() => {
    console.warn(`Server is Starting at ${Port}`.bgBlack.cyan)
})



