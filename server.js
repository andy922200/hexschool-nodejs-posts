/* init basic express app */
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.port || 8080

/* require config */
require('dotenv').config()

/* connect to mongoDB */
const mongoose = require('mongoose');
const mongoDbLocalPort = process.env.mongoDbLocalPort || '27017'
const dbName = "socialNetwork"
const localUrl = `mongodb://localhost:${mongoDbLocalPort}/${dbName}`
const remoteUrl = `mongodb+srv://${process.env.account}:${process.env.password}@cluster0.5mk4u.mongodb.net/${dbName}?retryWrites=true&w=majority`
const dbUrl = process.env.dbRemote ? remoteUrl : localUrl
console.log('dburl', dbUrl)
mongoose
    .connect(dbUrl)
    .then(() => console.log('資料庫連接成功'))
    .catch(() => console.log('資料庫連接錯誤'))

/* init routes */
require('./routes')(app)
app.listen(port)
