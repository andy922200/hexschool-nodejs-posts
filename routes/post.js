const express = require('express')
const router = express.Router()
const { excludeTrailingSlash } = require('../middleware/index')
const { handleErrorAsync } = require('../utils/errorHandler')
const postController = require('../controller/post_controller')

router.get('/', handleErrorAsync(postController.getPosts))
router.post('/', handleErrorAsync(postController.postOneNewPost))
router.patch('/:postId', handleErrorAsync(postController.updateThePost))
router.delete('/:postId', handleErrorAsync(postController.deleteOneOrAllPost))
router.delete('/', excludeTrailingSlash, handleErrorAsync(postController.deleteOneOrAllPost))

module.exports = router