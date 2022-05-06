/* connections */
const resGenerator = {
    "http": async ({ res, resHeader, statusCode, callback }) => {
        try{
            res.writeHead(statusCode, resHeader)
            if (callback) {
                await callback()
            }
            res.end()
        }catch(err){
            console.log(err)
        }
    },
    "express": async ({ res, resHeader, statusCode, callback }) => {
        try{
            res.status(statusCode)
            /* error can not set resHeader*/
            if(resHeader){
                res.set({
                    ...resHeader
                })
            }
            if (callback) {
                callback()
            }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = {
    connections:{
        resGenerator
    }
}