const jwt = require('jsonwebtoken')
const { appError } = require('../utils/errorHandler')

const generateJwtToken = async function(userId=""){
    let token = ""
    if(userId){
        token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        })
    }
    return token
}

module.exports = {
    generateJwtToken
}