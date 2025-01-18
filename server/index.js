const express = require("express")
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan=require('morgan')
const router = express.Router()
const path =require('path')


// rest object
const app = express()

// dot env
dotenv.config()

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// PORT
const Port = process.env.PORT

// routes

app.get('/', (req, res) => {
    res.status(200).json({
        sucess: true,
        message:"Welcome to Full Stack App"
    })
})


// Server

app.listen(Port,() => {
    console.warn(`Server is Starting at ${Port}`.bgBlack.cyan)
})



