const express= require('express')
const {addGroup, getGroups, addMember,addExpense, getGroup} =  require('../controller/groupController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

router.post('/dashboard/groups', addGroup)
router.get('/dashboard/groups', getGroups)
router.patch('/dashboard/groups/:id', addMember)
router.patch('/dashboard/groups/expense/:id', addExpense)
router.get('/groups/:id', getGroup)
module.exports=router