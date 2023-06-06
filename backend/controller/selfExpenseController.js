const SelfExpense = require('../model/selfExpenseModel')
const mongoose = require('mongoose')

//add a self expense
const addSelfExpense = async(req, res) => {
  const {title,amount,category,date} = req.body      
    // add doc to db
  try {
    const user_id = req.user._id
    const expense = await SelfExpense.create({title,amount,category,date, user_id})
    res.status(200).json(expense)
  } catch (error) {
    res.status(400).json({error: error.message})
  }

}

//get all selfExpense
const getSelfExpenses = async(req, res)=>{
    // add doc to db
  try {
    const user_id = req.user._id
    const expenses = await SelfExpense.find({user_id}).sort({createdAt: -1})
    res.status(200).json(expenses)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//delete a expense
const deleteSelfExpense = async (req, res) =>{
  const { id } = req.params
  console.log(id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such expense'})
  }

  const expense = await SelfExpense.findOneAndDelete({_id: id})

  if (!expense) {
    return res.status(400).json({error: 'No such expense'})
  }

  res.status(200).json(expense)
}

module.exports={
    addSelfExpense,
    getSelfExpenses,
    deleteSelfExpense
}