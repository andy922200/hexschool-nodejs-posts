const postRouter = require('./post')
const generalRouter = require('./general') // includes 404 missing routes

module.exports = (app) => {
    app.use('/posts', postRouter),
    app.use('/', generalRouter)
}
