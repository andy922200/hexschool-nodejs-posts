/* connections */
const resGenerator = {
    "http": async ({ res, resHeader, statusCode, callback }) => {
        try {
            res.writeHead(statusCode, resHeader)
            if (callback) {
                await callback()
            }
            res.end()
        } catch (err) {
            console.log(err)
        }
    },
    "express": async ({ res, resHeader, statusCode, callback }) => {
        try {
            res.status(statusCode)
            res.set({
                ...resHeader
            })
            if (callback) {
                await callback()
            }
        } catch (err) {
            console.log(err)
        }
    }
}

const errorHandler = {
    "http": ({ res, resHeader, statusCode, errorMessage }) => {
        resGenerator.http(({
            res,
            resHeader,
            statusCode: statusCode || 400,
            callback: () => {
                res.write(JSON.stringify({
                    status: 'fail',
                    message: errorMessage || 'Error'
                }))
            }
        }))
    },
    "express": ({ res, resHeader, statusCode, errorMessage }) => {
        resGenerator.express(({
            res,
            resHeader,
            statusCode: statusCode || 400,
            callback: () => {
                res.json({
                    status: 'fail',
                    message: errorMessage || 'Error'
                })
            }
        }))
    }
}

module.exports = {
    connections:{
        resGenerator,
        errorHandler
    }
}