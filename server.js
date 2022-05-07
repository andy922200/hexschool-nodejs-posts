/* init basic express app */
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
/* PORT should be capitalized*/
const port = process.env.PORT || 8080

/* require config */
require('dotenv').config()

/* connect to mongoDB */
const dbName = "socialNetwork"
require('./mongodb')(dbName)

/* init routes */
require('./routes')(app)
app.listen(port)

/* 錯誤處理 */
const { errorHandlerMainProcess } = require('./utils/errorHandler')
app.use(errorHandlerMainProcess)

// 程式出現重大錯誤
process.on('uncaughtException', (err) => {
    console.error('UnCaught Exception！')
    console.error(err)
    process.exit(1)
})
// 未捕捉到的 catch
process.on('unhandledRejection', (err, promise) => {
    console.error('未捕捉到的 rejection：', promise, '原因：', err)
})