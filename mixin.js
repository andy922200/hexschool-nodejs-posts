/* connections */
const resGenerator = async ({res, resHeader, statusCode, callback}) => {
    try{
        res.writeHead(statusCode, resHeader)
        if (callback) {
            await callback()
        }
        res.end()
    }catch(err){
        console.log(err)
    }
}

const errorHandler = ({res, resHeader, statusCode, errorMessage }) => {
    resGenerator({
        res,
        resHeader,
        statusCode: statusCode || 400,
        callback: () => {
            res.write(JSON.stringify({
                status: 'fail',
                message: errorMessage || 'Error'
            }))
        }
    })
}

module.exports = {
    connections:{
        resGenerator,
        errorHandler
    }
}