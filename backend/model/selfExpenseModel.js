const mongoose = require("mongoose");
const  selfExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required:true
    },
   amount: {
      type: Number,
      required: [true, "Please Enter Amount for Expense"],
    },

  category: {
      type: String,
    },
    date: {
      type: String,
      required:true
    },
    user_id:{
      type:String,
      required: true
    }

  },
  { timestamps: true }
);

const SelfExpense = mongoose.model("selfExpense", selfExpenseSchema);
module.exports = SelfExpense;