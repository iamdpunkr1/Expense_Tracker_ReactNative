const Group = require('../model/groupModel')
const User= require('../model/userModel')
const mongoose = require('mongoose')

//adding a group
const addGroup = async(req,res)=>{
    const {groupTitle, groupCategory,amount,createdBy,
        members:[{memberName, memberEmail, groupBalance}],
        groupExpenses:[]} = req.body

    try{
        const user_id = req.user._id
        const group =await Group.create({groupTitle, groupCategory,amount,createdBy,
            members:[{memberName, memberEmail, groupBalance}],
            groupExpenses:[],user_id})
        res.status(200).json(group)
       
    }catch(error){
        res.status(400).json({error:error.message})
       
    }
   
}

//getting all groups
const getGroups = async (req,res) => {
  
    try{
        const email = req.user.email
        const groups = await Group.find({"members.memberEmail":email}).sort({createdAt:-1})
        res.status(200).json(groups)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//getting a single groupdetails
const getGroup = async (req,res) => {
  
    try{
        const { id } = req.params
        // console.log(id)
        const group = await Group.findOne({_id:id})
        // console.log(group)
        res.status(200).json(group)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//add member
const addMember = async (req, res) =>{
    const { id } = req.params
    const { memberEmail, groupBalance}=req.body
    try{
        const exists = await User.findOne({email:memberEmail})
        const memberName=exists.username
        if(exists){
            const group= await Group.updateOne({_id:id},
                {
                    $push:{members:{memberName, memberEmail, groupBalance}}
                })
            const updatedGroup= await Group.findOne({_id:id})
            // console.log(updatedGroup)
            res.status(200).json(updatedGroup)
        }

    }catch(e){
        res.status(400).json({error:"Member not found"})
        // console.log(error.message)
    }
}

//remove member
const removeMember = async (req, res) =>{
    const { id } = req.params
    const { mEmail}=req.body
    try{
       
            const group= await Group.updateOne({_id:id},
                {
                    $pull:{members:{memberEmail:mEmail}}
                })
            const updatedGroup= await Group.findOne({_id:id})
            // console.log(updatedGroup)
            res.status(200).json(updatedGroup)
        

    }catch(error){
        res.status(400).json({error:error.message})
        // console.log(error.message)
    }
}

//add GroupExpense
const addExpense = async (req, res) =>{
    const { id } = req.params
    const {amount, groupExpenses, members}=req.body
    
 
    try{
        
            const group= await Group.updateOne({_id:id},
                {
                    $set:{amount,
                        groupExpenses,
                        members
                    }
                })
            const updatedGroup= await Group.findOne({_id:id})
            // console.log(updatedGroup)
            res.status(200).json(updatedGroup)
        

    }catch(error){
        res.status(400).json({error:error.message})
        // console.log(error.message)
    }
}


//delete Group expense
const deleteGroupExpense = async (req, res) =>{
    const { id } = req.params
    const {amount, groupExpenses, members}=req.body
    
 
    try{
        
            const group= await Group.updateOne({_id:id},
                {
                    $set:{amount,
                        groupExpenses,
                        members
                    }
                })
            const updatedGroup= await Group.findOne({_id:id})
            // console.log(updatedGroup)
            res.status(200).json(updatedGroup)
        

    }catch(error){
        res.status(400).json({error:error.message})
        // console.log(error.message)
    }
  }

//update GroupExpense
const updateExpense = async (req, res) =>{
    const { id } = req.params
    const {amount, groupExpenses, members}=req.body
    
 
    try{
        
            const group= await Group.updateOne({_id:id},
                {
                    $set:{
                        amount,
                        groupExpenses,
                        members
                    }
                })
            const updatedGroup= await Group.findOne({_id:id})
            // console.log(updatedGroup)
            res.status(200).json(updatedGroup)
        

    }catch(error){
        res.status(400).json({error:error.message})
        // console.log(error.message)
    }
}

 
module.exports={
    addGroup,
    getGroups,
    addMember,
    removeMember,
    deleteGroupExpense,
    addExpense,
    updateExpense,
    getGroup
}