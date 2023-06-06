const Group = require('../model/groupModel')
const User= require('../model/userModel')

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
        console.log(id)
        const group = await Group.findOne({_id:id})
        console.log(group)
        res.status(200).json(group)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const addMember = async (req, res) =>{
    const { id } = req.params
    const {memberName, memberEmail, groupBalance}=req.body
    const exists = await User.findOne({memberEmail})
    console.log(exists)
    try{
        if(exists){
            const group= await Group.updateOne({_id:id},
                {
                    $push:{members:{memberName, memberEmail, groupBalance}}
                })
            const updatedGroup= await Group.findOne({_id:id})
            console.log(updatedGroup)
            res.status(200).json(updatedGroup)
        }

    }catch(error){
        res.status(400).json({error:error.message})
        console.log(error.message)
    }
}

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
        console.log(error.message)
    }
}

module.exports={
    addGroup,
    getGroups,
    addMember,
    addExpense,
    getGroup
}