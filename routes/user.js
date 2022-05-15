const express = require('express')
const router = express.Router()
const { handleErrorAsync } = require('../utils/errorHandler')
const userController = require('../controller/user_controller')

router.post('/sign_up',
    /**
    *   #swagger.tags = ['Users']
    *   #swagger.description = '註冊使用者'
    *   #swagger.responses[200] = { 
            description: "Register a new user successfully." 
        } 
    */
    handleErrorAsync(userController.signUp)
)


module.exports = router