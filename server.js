/* init basic express app */
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.port || 8080

/* connect to mongoDB */
const mongoose = require('mongoose');
const mongoDbUrl = process.env.mongoDbUrl || 'localhost'
const mongoDbPort = process.env.mongoDbPort || '27017'
const dbName = "social_network"
mongoose
    .connect(`mongodb://${mongoDbUrl}:${mongoDbPort}/${dbName}`)
    .then(() => console.log('資料庫連接成功'))
    .catch(() => console.log('資料庫連接錯誤'))

/* init routes */
require('./routes')(app)
app.listen(port)
