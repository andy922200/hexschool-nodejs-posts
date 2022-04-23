const express = require('express')
const router = express.Router()

const postController = require('../controller/post_controller')

router.get('/', postController.getPosts)
router.post('/', postController.postOneNewPost)
router.patch('/:postId', postController.updateThePost)
router.delete('/:postId', postController.deleteOneOrAllPost)
router.delete('/', postController.deleteOneOrAllPost)

module.exports = router