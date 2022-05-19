const express = require('express')
const router = express.Router()
const { handleErrorAsync } = require('../utils/errorHandler')
const userController = require('../controller/user_controller')
const { isAuth } = require('../middleware/auth')

router.post('/sign_up',
    /**
    *   #swagger.tags = ['Users']
    *   #swagger.description = '註冊使用者'
    *   #swagger.responses[200] = { 
            description: "Register a new user successfully." 
        } 
    *   #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            description: '資料格式',
            schema:{
                "$email": 'email@email.com',
                "$name": 'name',
                "$password": 'password'
            }
        }
    */
    handleErrorAsync(userController.signUp)
)

router.post('/sign_in',
    /**
    *   #swagger.tags = ['Users']
    *   #swagger.description = '使用者登入'
    *   #swagger.responses[200] = { 
            description: "User Login successfully." 
        } 
    *   #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            description: '資料格式',
            schema:{
                "$email": 'email@email.com',
                "$password": 'password'
            }
        }
    */
    handleErrorAsync(userController.signIn)
)

router.post('/update_password',
    /**
    *   #swagger.tags = ['Users']
    *   #swagger.description = '更新使用者密碼'
    *   #swagger.responses[200] = { 
            description: "Update password successfully." 
        } 
    *   #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            description: '資料格式',
            schema:{
                "$password": 'password',
                "$confirmPassword": 'confirmPassword'
            }
        }
    */
    isAuth,
    handleErrorAsync(userController.updatePassword)
)

router.get('/profile',
    /**
    *   #swagger.tags = ['Users']
    *   #swagger.description = '取得使用者資料'
    *   #swagger.responses[200] = { 
            description: "success" 
        } 
    */
    isAuth,
    handleErrorAsync(userController.getProfile)
)

router.patch('/profile',
    /**
    *   #swagger.tags = ['Users']
    *   #swagger.description = '更新使用者資料'
    *   #swagger.responses[200] = { 
            description: "success" 
        } 
    *   #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            description: '資料格式',
            schema:{
                "$name": 'Name',
                "$sex": 1
            }
        }
    */
    isAuth,
    handleErrorAsync(userController.patchProfile)
)


module.exports = router