const express = require('express')
const router = express.Router()
const resHeader = {
    "Access-Control-Allow-Headers": 'Content-Type, Authorization, Content-Length, X-Requested-With',
    "Access-Control-Allow-Origin": '*',
    "Access-Control-Allow-Methods": 'PATCH, POST, GET, OPTIONS, DELETE',
    "content-type": "application/json"
}
const {
    connections: { resGenerator, errorHandler }
} = require('../mixin')

router.get('/', (req, res)=>{
    resGenerator.express({
        res,
        resHeader,
        statusCode: 200,
        callback: ()=>{
            res.json({
                status: 'success',
                message: 'This is index page.'
            })
        }
    })
})

router.get('*', (req, res)=>{
    errorHandler.express(({
        res,
        resHeader,
        statusCode: 200,
        errorMessage: 'Invalid Route'
    }))
})

module.exports = router