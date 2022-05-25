const express = require('express')
const router = express.Router()
const { excludeTrailingSlash } = require('../middleware/index')
const { handleErrorAsync } = require('../utils/errorHandler')
const uploadController = require('../controller/upload_controller')
const { isAuth } = require('../middleware/auth')
const { upload } = require('../middleware/upload')

router.post('/',
    /**
    *   #swagger.tags = ['Upload']
    *   #swagger.description = '上傳圖片 API'
    *   #swagger.responses[200] = { 
            description: "Upload your image successfully." 
        } 
    */
    isAuth,
    upload,
    handleErrorAsync(uploadController.uploadOneImage)
)


module.exports = router