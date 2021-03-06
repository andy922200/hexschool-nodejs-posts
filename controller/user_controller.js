const validator = require('validator');
const bcrypt = require('bcryptjs')
/* require related DB Model*/
const User = require('../model/user_model')
const resHeader = require('../constants')
const { appError } = require('../utils/errorHandler')
const { stringChecker } = require('../utils/mixin')
const { generateJwtToken } = require('../middleware/auth')

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

        password = await bcrypt.hash(rawPassword, Number(process.env.saltDegree))

        const newUser = await User.create({
            name,
            email,
            password
        })

        const token = await generateJwtToken(newUser._id)

        res.status(200)
            .set({
                ...resHeader
            })
            .json({
                status: 'success',
                data: {
                    user:{
                        name: newUser.name,
                        token
                    }
                },
                message: 'Register a new user successfully'
            })
    },
    signIn: async (req, res, next) => {
        const {
            email,
            password: rawPassword
        } = req.body

        let password = stringChecker(rawPassword)

        if (!email || !password) {
            return next(appError(400, "ValidationError", "Missing Required Values", next))
        }

        if (!validator.isEmail(email)) {
            return next(appError(400, "ValidationError", "Email format is not valid.", next))
        }

        if (!validator.isLength(password, { min: 8 })) {
            return next(appError(400, "ValidationError", "The password length should be larger than 8.", next))
        }

        const user = await User.findOne({email}).select('+password')
        const authResult = await bcrypt.compare(password, user.password)
        
        if(authResult){
            const token = await generateJwtToken(user._id)

            res.status(200)
                .set({
                    ...resHeader
                })
                .json({
                    status: 'success',
                    data: {
                        user: {
                            name: user.name,
                            token
                        }
                    },
                    message: `${user.name} Login successfully`
                })
        }else{
            return next(appError(400, "ValidationError", "Your password is not correct.", next))
        }
    },
    updatePassword: async (req, res, next) => {
        const {
            password: rawPassword,
            confirmPassword: rawConfirmPassword
        } = req.body

        let password = stringChecker(rawPassword)
        let confirmPassword = stringChecker(rawConfirmPassword)

        if (password !== confirmPassword){
            return next(appError(400, "ValidationError", "Passwords are not matched.", next))
        }

        const newPassword = await bcrypt.hash(rawPassword, Number(process.env.saltDegree))
        const user = await User.findByIdAndUpdate(req.user.id,{
            password: newPassword
        }, { new: true, runValidators: true })
        const token = await generateJwtToken(user._id)

        res.status(200)
            .set({
                ...resHeader
            })
            .json({
                status: 'success',
                data: {
                    user: {
                        name: user.name,
                        token
                    }
                },
                message: 'Update password successfully'
            })
    },
    getProfile: async (req, res, next) => {
        res.status(200)
            .set({
                ...resHeader
            })
            .json({
                status: 'success',
                data: {
                    user: req.user
                },
                message: 'success'
            })
    },
    patchProfile: async (req, res, next) => {
        const {
            name: rawName,
            sex,
        } = req.body

        let name = stringChecker(rawName)

        if (!name || !sex) {
            return next(appError(400, "ValidationError", "Missing Required Values", next))
        }

        const user = await User.findByIdAndUpdate(req.user.id, {
            name,
            sex
        }, { new: true, runValidators: true })

        res.status(200)
            .set({
                ...resHeader
            })
            .json({
                status: 'success',
                data: {
                    user: {
                        name: user.name,
                        sex: user.sex
                    }
                },
                message: 'Update your profile successfully'
            })
    }
}

module.exports = userController