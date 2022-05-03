const express = require('express')
const router = express.Router()
const resHeader = require('../constants')
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
        statusCode: 404,
        errorMessage: 'Invalid Route'
    }))
})

module.exports = router