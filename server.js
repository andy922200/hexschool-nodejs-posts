const http = require('http')
require('dotenv').config()
const port = process.env.port || 8080
const { connections: { resGenerator, errorHandler }} = require('./mixin')
const resHeader = {
    "Access-Control-Allow-Headers": 'Content-Type, Authorization, Content-Length, X-Requested-With',
    "Access-Control-Allow-Origin": '*',
    "Access-Control-Allow-Methods": 'PATCH, POST, GET, OPTIONS, DELETE',
    "content-type": "application/json"
}

/* connect to mongoDB */
const mongoose = require('mongoose');
const mongoDbLocalPort = process.env.mongoDbLocalPort || '27017'
const dbName = "socialNetwork"
const localUrl = `mongodb://localhost:${mongoDbLocalPort}/${dbName}`
const remoteUrl = `mongodb+srv://${process.env.account}:${process.env.password}@cluster0.5mk4u.mongodb.net/${dbName}?retryWrites=true&w=majority`
const { Post } = require('./model/post')
const dbUrl = process.env.dbRemote ? remoteUrl : localUrl

mongoose
    .connect(dbUrl)
    .then(() => console.log('資料庫連接成功'))
    .catch(() => console.log('資料庫連接錯誤'))

const requestListener = (req, res)=>{
    const { method: reqMethod } = req

    let body = ""
    req.on('data', chunk => {
        body += chunk
    })

    if (req.url === '/'){
        switch (reqMethod) {
            default:
                resGenerator({
                    res,
                    resHeader,
                    statusCode: 200,
                    callback: () => {
                        res.write(JSON.stringify({
                            status: 'success',
                            message: 'This is index page.'
                        }))
                    }
                })
                break
        }
        return;
    }

    if (req.url.startsWith('/posts')) {
        switch (reqMethod) {
            case 'GET':
                resGenerator({
                    res,
                    resHeader,
                    statusCode: 200,
                    callback: async() => {
                        try{
                            const allPosts = await Post.find()
                            res.write(JSON.stringify({
                                status: 'success',
                                data: allPosts
                            }))
                        }catch(err){
                            console.log(err)
                        }
                    }
                })
                break
            case 'OPTION':
                resGenerator({
                    res,
                    resHeader,
                    statusCode: 200
                })
                break
            case 'POST':
                req.on('end', async () => {
                    try {
                        const data = JSON.parse(body)
                        if (data) {
                            await Post.create({
                                content: data.content,
                                image: data.image,
                                name: data.name,
                            })
                            resGenerator({
                                res,
                                resHeader,
                                statusCode: 200,
                                callback: () => {
                                    res.write(JSON.stringify({
                                        status: 'success',
                                        message: 'New Post is added successfully'
                                    }))
                                }
                            })
                        } else {
                            errorHandler({
                                res,
                                resHeader,
                                statusCode: null,
                                errorMessage: "Missing required values"
                            })
                        }
                    } catch (err) {
                        errorHandler({
                            res,
                            resHeader,
                            statusCode: null,
                            errorMessage: "Error Happened! Please check your input or try again later."
                        })
                    }
                })
                break
            case 'PATCH':
                req.on('end', async () => {
                    try {
                        const data = JSON.parse(body)
                        const id = req.url.split('/posts/')[1]

                        if (data) {
                            if (id) {
                                await Post.findByIdAndUpdate(id,{
                                    content: data.content,
                                    image: data.image,
                                    name: data.name,
                                })
                                resGenerator({
                                    res,
                                    resHeader,
                                    statusCode: 200,
                                    callback: () => {
                                        res.write(JSON.stringify({
                                            status: 'success',
                                            message: 'The post is updated successfully'
                                        }))
                                    }
                                })
                            } else {
                                errorHandler({
                                    res,
                                    resHeader,
                                    statusCode: null,
                                    errorMessage: "The post is not existed."
                                })
                            }
                        } else {
                            errorHandler({
                                res,
                                resHeader,
                                statusCode: null,
                                errorMessage: "Missing required values"
                            })
                        }
                    } catch (err) {
                        errorHandler({
                            res,
                            resHeader,
                            statusCode: null,
                            errorMessage: "Error Happened! Please check your input or try again later."
                        })
                    }
                })
                break
            case 'DELETE':
                resGenerator({
                    res,
                    resHeader,
                    statusCode: 200,
                    callback: async() => {
                        try{
                            const id = req.url.split('/posts/')[1]

                            if (id) {
                                await Post.findByIdAndDelete(id)
                                res.write(JSON.stringify({
                                    status: 'success',
                                    message: `The post ${id} is deleted successfully`
                                }))
                            } else {
                                await Post.deleteMany({})
                                resGenerator({
                                    res,
                                    resHeader,
                                    statusCode: 200,
                                    callback: () => {
                                        res.write(JSON.stringify({
                                            status: 'success',
                                            message: 'Delete all posts successfully'
                                        }))
                                    }
                                })
                            }
                        }catch(err){
                            console.log(err)
                        }
                    }
                })
                break
        }
        return;
    }

    errorHandler({
        res,
        resHeader,
        statusCode: 200,
        errorMessage: 'Invalid Route'
    })
}

const server = http.createServer(requestListener)
server.listen(port)