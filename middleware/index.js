const { appError } = require('../utils/errorHandler')
const excludeTrailingSlash = (req, res, next) => {
    if ((req.originalUrl.substr(-1) === '/' || req.originalUrl.indexOf('/?') > -1) && req.originalUrl.length > 1) {
        next(appError(404, "", 'Invalid Route', next))
    } else {
        next()
    }
}

module.exports = {
    excludeTrailingSlash
}
