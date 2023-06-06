const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema= new Schema({
    email:{
        type: String,
        required:true,
        unique:true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    }
})

// static SignUP method
userSchema.statics.signup=async function(email, password, username){
    if(!email || !password || !username){
        throw Error("All fields must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }

    // if(!validator.isStrongPassword(password)){
    //     throw Error("Password is not Strong")
    // }

    if(!validator.isAlpha(username,['en-US'], {'ignore': ' _-'})){
        throw Error("Name must contain only alphabets")
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error("Email already in use")
    }

    const salt= await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password, salt)
    const user= await this.create({email, password:hash, username}) 

    return user

}

userSchema.statics.login= async function(email, password){
    if(!email || !password){
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect email')
    }

    const match= await bcrypt.compare(password, user.password)
    if(!match){
        throw Error("Incorrect Password")
    }

    return user
}

module.exports=mongoose.model('User',userSchema)