const express = require('express')
const { RegisterController, LoginController } = require('../controllers/RegisterController')

const router = express.Router()

router.post('/register',RegisterController)

router.post('/login',LoginController)
module.exports=router