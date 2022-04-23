const Post = require('../model/post_model')
const {
    connections: { resGenerator, errorHandler }
} = require('../mixin')
const resHeader = {
    "Access-Control-Allow-Headers": 'Content-Type, Authorization, Content-Length, X-Requested-With',
    "Access-Control-Allow-Origin": '*',
    "Access-Control-Allow-Methods": 'PATCH, POST, GET, OPTIONS, DELETE',
    "content-type": "application/json"
}

const postController = {
    getPosts: (req, res)=>{
        resGenerator.express({
            res,
            resHeader,
            statusCode: 200,
            callback: async () => {
                try {
                    const allPosts = await Post.find()
                    res.json({
                        status: 'success',
                        data: allPosts
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
    },
    postOneNewPost: async (req, res)=>{
        try{
            const { content, image, name } = req.body
            if (content && image && name ) {
                await Post.create({
                    content,
                    image,
                    name,
                })
                resGenerator.express({
                    res,
                    resHeader,
                    statusCode: 200,
                    callback: () => {
                        res.json({
                            status: 'success',
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
            const { content, image, name } = req.body
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
                                    message: 'The post is updated successfully'
                                })
                            }
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