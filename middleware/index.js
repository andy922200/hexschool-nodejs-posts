const resHeader = require('../constants')
const {
    connections: { errorHandler }
} = require('../mixin.js')

const excludeTrailingSlash = (req, res, next) => {
    if ((req.originalUrl.substr(-1) === '/' || req.originalUrl.indexOf('/?') > -1) && req.originalUrl.length > 1) {
        errorHandler.express(({
            res,
            resHeader,
            statusCode: 404,
            errorMessage: 'Invalid Route'
        }))
    } else {
        next()
    }
}

module.exports = {
    excludeTrailingSlash
}
