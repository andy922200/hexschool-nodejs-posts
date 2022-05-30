const postRouter = require('./post')
const userRouter = require('./user')
const uploadRouter = require('./upload')
const generalRouter = require('./general') // includes 404 missing routes

/* generate swagger UI for Testing */
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')

module.exports = (app) => {
    app.use('/posts', postRouter),
    app.use('/users', userRouter),
    app.use('/upload', uploadRouter),
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))
    app.use('/', generalRouter)
}
