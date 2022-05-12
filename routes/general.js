const express = require('express')
const router = express.Router()
const { appError } = require('../utils/errorHandler')
const resHeader = require('../constants')

router.get('/', (req, res, next)=>{
    /**
    *  #swagger.tags = ['Generals']
    */
    res.status(200)
        .set({
            ...resHeader
        })
        .json({
            status: 'success',
            message: 'This is index page.'
        })
})

router.get('*', (req, res, next)=>{
    /**
    *  #swagger.tags = ['Generals']
    */
    next(appError(404, "", 'Invalid Route', next))
})

module.exports = router