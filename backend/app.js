require('dotenv').config()
const express= require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const selfExpenseRoutes = require('./routes/selfExpenseRoutes')
const groupRoutes = require('./routes/groupRoutes')

const app = express()

app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.method, req.path)
    next()
})
app.get('/',(req,res)=>{
    res.json({data:"Get method called"})
})
app.use('/',userRoutes)
app.use('/',selfExpenseRoutes)
app.use('/',groupRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log('connected to db and listening to port: ', process.env.PORT)
        })
    }).catch(err=>console.log(err))