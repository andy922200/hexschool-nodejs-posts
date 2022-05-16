const express = require('express')
const router = express.Router()
const { excludeTrailingSlash } = require('../middleware/index')
const { handleErrorAsync } = require('../utils/errorHandler')
const postController = require('../controller/post_controller')
const { isAuth } = require('../middleware/auth')

router.get('/', 
    /**
    *   #swagger.tags = ['Posts']
    *   #swagger.description = '取得全部貼文 API'
    *   #swagger.responses[200] = { 
            description: "Get all posts successfully." 
        } 
    */
    isAuth,
    handleErrorAsync(postController.getPosts)
)
router.post('/', 
    /**
    *   #swagger.tags = ['Posts']
    *   #swagger.description = '新增貼文'
    *   #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            description: '資料格式',
                schema:{
                "$name": 'Name',
                "$content": 'This is content',
                "$userId": '627ca72879a62b5adf921bff',
                "$image": 'image'
            }
        }
    *   #swagger.responses[200] = { 
            description: "Post created successfully." 
        } 
    */
    isAuth,
    handleErrorAsync(postController.postOneNewPost)
)
router.patch('/:postId', 
    /**
    *   #swagger.tags = ['Posts']
    *   #swagger.description = '更新特定一篇貼文'
    *   #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            description: '資料格式',
            schema:{
                "$name": 'Name',
                "$content": 'This is content',
                "$userId": '627ca72879a62b5adf921bff',
                "$image": 'image'
            }
        }
    *   #swagger.responses[200] = { 
            description: "Post updated successfully." 
        } 
    */
    isAuth,
    handleErrorAsync(postController.updateThePost)
)
router.delete('/:postId', 
    /**
    *   #swagger.tags = ['Posts']
    *   #swagger.description = '刪除特定一篇貼文'
    *   #swagger.responses[200] = { 
            description: "Delete a post successfully." 
        } 
    */
    isAuth,
    handleErrorAsync(postController.deleteOneOrAllPost)
)
router.delete('/', excludeTrailingSlash, 
    /**
    *   #swagger.tags = ['Posts']
    *   #swagger.description = '刪除所有貼文'
    *   #swagger.responses[200] = { 
            description: "Delete all posts updated successfully." 
        } 
    */
    isAuth,
    handleErrorAsync(postController.deleteOneOrAllPost)
)

module.exports = router