const User= require('../model/userModel')
const jwt=require("jsonwebtoken")

const createToken= (_id)=>{
    return jwt.sign({_id}, process.env.SECRET,{expiresIn:'3d'})
}

//login a user
const loginUser = async(req, res)=>{
    const {email, password}=req.body

    try{
        const user= await User.login(email,password)
        const token= createToken(user._id)
        res.status(200).json({user,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//signUp a user
const signupUser = async(req, res)=>{
    const {email, password, username,balance}=req.body

    try{
        const user= await User.signup(email,password,username,balance)
        const token= createToken(user._id)
        res.status(200).json({user,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//set Balance
const setBalance=async(req,res)=>{
    const { id } = req.params
    const {newBalance}=req.body
     try{

        const userd= await User.updateOne({_id:id},
            {
                $set:{
                    balance:newBalance
                }
            })
     const user = await User.findOne({_id:id})
     const token= createToken(user._id)
     res.status(200).json({user,token})
     }catch(error){
        res.status(400).json({error:error.message})
     }
}
module.exports={loginUser, signupUser, setBalance}