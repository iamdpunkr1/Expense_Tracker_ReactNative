const mongoose = require('mongoose')
const groupSchema = new mongoose.Schema(
    {
        groupTitle:{
            type: String,
            required: true
        },
        groupCategory:{
            type: String,
            required: true
        },
        amount:{
            type: Number,
            required: true
        },
        createdBy:{
            type: String,
            required: true
        },
        members:
        [
            {
            memberName:{
                type: String,
                required: true
            },
            memberEmail:{
                type: String,
                required:true,
                lowercase: true
            },
            groupBalance:{
                type: Number,
                required: true
            }
            }
                ],
        groupExpenses:[],
        user_id:{
          type:String,
          required: true
        }
      },
      { timestamps: true }
);

const Group=mongoose.model('Group',groupSchema)
module.exports=Group;