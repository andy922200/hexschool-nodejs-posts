/* require related DB Model*/
const Post = require('../model/post_model')
const User = require('../model/user_model')
const { appError } = require('../utils/errorHandler')
const resHeader = require('../constants')

const postController = {
    getPosts: async(req, res, next)=>{
        const timeSort = req.query.timeSort === "asc" ? "createdAt" : "-createdAt"
        const queryString = req.query.q !== undefined
            ? { "content": new RegExp(req.query.q.trim()) }
            : {}
        const allPosts = await Post.find(queryString).populate({
            path: 'user',
            select: 'name photo'
        }).sort(timeSort)

        res.status(200)
            .set({
                ...resHeader
            })
            .json({
                status: 'success',
                data: allPosts
            })
    },
    postOneNewPost: async (req, res, next)=>{
        const { 
            content: rawContent, 
            image, 
            name: rawName,
            userId: rawUserId 
        } = req.body
        const content = typeof rawContent === 'string' ? rawContent.trim(): ''
        const name = typeof rawName === 'string' ? rawName.trim() : ''
        const userId = typeof rawUserId === 'string' ? rawUserId : ''

        if (content && image && name && userId) {
            const result = await Post.create({
                content,
                image,
                name,
                user: userId
            })
            
            res.status(200)
                .set({
                    ...resHeader
                })
                .json({
                    status: 'success',
                    data: result,
                    message: 'New Post is added successfully'
                })
        } else {
            next(appError(400, "ValidationError","Missing Required Values", next))
        }
    },
    updateThePost: async (req, res, next)=>{
        const { content: rawContent, image, name: rawName } = req.body
        const content = typeof rawContent === 'string' ? rawContent.trim() : ''
        const name = typeof rawName === 'string' ? rawName.trim() : ''
        const postId = req.params.postId

        if (content && image && name) {
            if (postId) {
                const result = await Post.findByIdAndUpdate(postId, {
                    content,
                    image,
                    name,
                }, { new: true, runValidators: true })
                if(result){
                    res.status(200)
                        .set({
                            ...resHeader
                        })
                        .json({
                            status: 'success',
                            data: result,
                            message: 'The post is updated successfully'
                        })
                }else{
                    next(appError(400, "", `The post ${postId} is not existed or updated failed.`, next))
                }
            } else {
                next(appError(400, "", "The post is not existed.", next))
            }
        } else {
            next(appError(400, "ValidationError","Missing Required Values", next))
        }
    },
    deleteOneOrAllPost: async (req, res, next)=>{
        const postId = req.params.postId
        if(postId){
            const result = await Post.findByIdAndDelete(postId)
            if(result){
                res.status(200)
                    .set({
                        ...resHeader
                    })
                    .json({
                        status: 'success',
                        message: `The post ${postId} is deleted successfully`
                    })
            }else{
                next(appError(400, "",`The post ${postId} is not existed or deleted failed.`, next))
            }
        }else{
            await Post.deleteMany({})
            res.status(200)
                .set({
                    ...resHeader
                })
                .json({
                    status: 'success',
                    message: 'Delete all posts successfully'
                })
        }
    }
}

module.exports = postController