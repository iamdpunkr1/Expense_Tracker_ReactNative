const express = require('express')
const {loginUser, signupUser} = require('../controller/userController')

const router = express.Router()

router.post('/login',loginUser)

router.post('/signup',signupUser)

module.exports=router