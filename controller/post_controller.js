/* require related DB Model*/
const Post = require('../model/post_model')
const User = require('../model/user_model')
const {
    connections: { resGenerator, errorHandler }
} = require('../mixin')
const resHeader = require('../constants')

const postController = {
    getPosts: async (req, res)=>{
        try{
            const timeSort = req.query.timeSort === "asc" ? "createdAt" : "-createdAt"
            const queryString = req.query.q !== undefined
                ? { "content": new RegExp(req.query.q.trim()) }
                : {}
            const allPosts = await Post.find(queryString).populate({
                path: 'user',
                select: 'name photo'
            }).sort(timeSort)

            resGenerator.express({
                res,
                resHeader,
                statusCode: 200,
                callback: async () => {
                    try {
                        resGenerator.express({
                            res,
                            resHeader,
                            statusCode: 200,
                            callback: () => {
                                res.json({
                                    status: 'success',
                                    data: allPosts
                                })
                            }
                        })
                    } catch (err) {
                        errorHandler.express(({
                            res,
                            resHeader,
                            statusCode: null,
                            errorMessage: "Error Happened! Please try again later."
                        }))
                    }
                }
            })
        }catch(err){
            console.log(err)
        }
    },
    postOneNewPost: async (req, res)=>{
        try{
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
                resGenerator.express({
                    res,
                    resHeader,
                    statusCode: 200,
                    callback: () => {
                        res.json({
                            status: 'success',
                            data: result,
                            message: 'New Post is added successfully'
                        })
                    }
                })
            } else {
                errorHandler.express(({
                    res,
                    resHeader,
                    statusCode: null,
                    errorMessage: "Missing required values"
                }))
            }
        }catch(err){
            errorHandler.express(({
                res,
                resHeader,
                statusCode: null,
                errorMessage: "Error Happened! Please check your input or try again later."
            }))
        }
    },
    updateThePost: async (req, res)=>{
        try{
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
                    })
                    if(result){
                        resGenerator.express(({
                            res,
                            resHeader,
                            statusCode: 200,
                            callback: () => {
                                res.json({
                                    status: 'success',
                                    data: result,
                                    message: 'The post is updated successfully'
                                })
                            }
                        }))
                    }else{
                        errorHandler.express(({
                            res,
                            resHeader,
                            statusCode: null,
                            errorMessage: `The post ${postId} is not existed or updated failed.`
                        }))
                    }
                } else {
                    errorHandler.express(({
                        res,
                        resHeader,
                        statusCode: null,
                        errorMessage: "The post is not existed."
                    }))
                }
            } else {
                errorHandler.express(({
                    res,
                    resHeader,
                    statusCode: null,
                    errorMessage: "Missing required values"
                }))
            }
        }catch(err){
            errorHandler.express(({
                res,
                resHeader,
                statusCode: null,
                errorMessage: "Error Happened! Please check your input or try again later."
            }))
        }
    },
    deleteOneOrAllPost: async (req, res)=>{
        try{
            const postId = req.params.postId

            if(postId){
                const result = await Post.findByIdAndDelete(postId)
                if(result){
                    resGenerator.express(({
                        res,
                        resHeader,
                        statusCode: 200,
                        callback: () => {
                            res.json({
                                status: 'success',
                                message: `The post ${postId} is deleted successfully`
                            })
                        }
                    }))
                }else{
                    errorHandler.express(({
                        res,
                        resHeader,
                        statusCode: null,
                        errorMessage: `The post ${postId} is not existed or deleted failed.`
                    }))
                }
            }else{
                await Post.deleteMany({})
                resGenerator.express(({
                    res,
                    resHeader,
                    statusCode: 200,
                    callback: () => {
                        res.json({
                            status: 'success',
                            message: 'Delete all posts successfully'
                        })
                    }
                }))
            }
        }catch(err){
            errorHandler.express(({
                res,
                resHeader,
                statusCode: null,
                errorMessage: "Error Happened! Please try again later."
            }))
        }
    }
}

module.exports = postController