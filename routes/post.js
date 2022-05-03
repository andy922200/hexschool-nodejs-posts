const express = require('express')
const router = express.Router()
const { excludeTrailingSlash } = require('../middleware/index')
const postController = require('../controller/post_controller')

router.get('/', postController.getPosts)
router.post('/', postController.postOneNewPost)
router.patch('/:postId', postController.updateThePost)
router.delete('/:postId', postController.deleteOneOrAllPost)
router.delete('/', excludeTrailingSlash ,postController.deleteOneOrAllPost)

module.exports = router