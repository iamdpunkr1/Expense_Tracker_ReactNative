const express= require('express')
const {addGroup, getGroups, addMember,deleteGroup, removeMember, addExpense,updateExpense, getGroup,deleteGroupExpense} =  require('../controller/groupController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

router.post('/dashboard/groups', addGroup)
router.get('/dashboard/groups', getGroups)
router.patch('/dashboard/groups/:id', addMember)
router.delete('/dashboard/group/:id', deleteGroup)
router.patch('/dashboard/groups/members/:id', removeMember)
router.patch('/dashboard/groups/expense/:id', addExpense)
router.patch('/dashboard/groups/update/:id', updateExpense)
router.patch('/dashboard/groups/expense/delete/:id', deleteGroupExpense)
router.get('/groups/:id', getGroup)
module.exports=router