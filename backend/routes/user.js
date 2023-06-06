const express = require('express')
const {loginUser, signupUser,setBalance} = require('../controller/userController')

const router = express.Router()

router.post('/login',loginUser)
router.post('/signup',signupUser)
router.patch('/balance/:id',setBalance)

module.exports=router