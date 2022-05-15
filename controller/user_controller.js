/* require related DB Model*/
const User = require('../model/user_model')
const { appError } = require('../utils/errorHandler')
const resHeader = require('../constants')
const { stringChecker } = require('../utils/mixin')
const validator = require('validator');
const bcrypt = require('bcryptjs')

const userController = {
    signUp: async (req, res, next) => {
        const {
            email,
            name: rawName,
            password: rawPassword
        } = req.body

        const name = stringChecker(rawName)
        let password = stringChecker(rawPassword)

        if (!email || !name || !password) {
            return next(appError(400, "ValidationError", "Missing Required Values", next))
        }

        if (!validator.isEmail(email)){
            return next(appError(400, "ValidationError", "Email format is not valid.", next))
        }

        if (!validator.isLength(password, { min: 8 })){
            return next(appError(400, "ValidationError", "The password length should be larger than 8.", next))
        }

        password = await bcrypt.hash(rawPassword, 10)

        const newUser = await User.create({
            name,
            email,
            password
        })

        res.status(200)
            .set({
                ...resHeader
            })
            .json({
                status: 'success',
                data: {
                    name: newUser.name
                },
                message: 'Register a new user successfully'
            })
    }
}

module.exports = userController