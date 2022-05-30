const sizeOf = require('image-size')
const { ImgurClient } = require('imgur')
const { appError } = require('../utils/errorHandler')
const resHeader = require('../constants')

const uploadController = {
    uploadOneImage: async (req, res, next) => {
        if (!req.files.length) {
            return next(appError(400, "", "尚未上傳檔案", next))
        }

        const dimensions = sizeOf(req.files[0].buffer)
        if (dimensions.width !== dimensions.height) {
            return next(appError(400, "", "圖片長寬不符合 1:1 ", next))
        }

        const client = new ImgurClient({
            clientId: process.env.IMGUR_CLIENT_ID,
            clientSecret: process.env.IMGUR_CLIENT_SECRET,
            refreshToken: process.env.IMGUR_REFRESH_TOKEN,
        })

        const { data, status, success } = await client.upload({
            image: req.files[0].buffer.toString('base64'),
            type: 'base64',
            album: process.env.IMGUR_ALBUM_ID
        })

        if(success){
            res.status(200)
                .set({
                    ...resHeader
                })
                .json({
                    status: 'success',
                    data: {
                        imgUrl: data.link
                    }
                })
        }else{
            return next(appError(status, "", "發生錯誤，請稍後再試", next))
        }
    }
}

module.exports = uploadController