const express = require('express')
const router = express.Router()
const {
    connections: { resGenerator }
} = require('../mixin')
const { appError } = require('../utils/errorHandler')
const resHeader = require('../constants')

router.get('/', (req, res, next)=>{
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

router.get('*', (req, res, next)=>{
    next(appError(404, "", 'Invalid Route', next))
})

module.exports = router