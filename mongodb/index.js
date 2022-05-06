const mongoose = require('mongoose');

function initMongoDB(dbName=''){
    const mongoDbLocalPort = process.env.mongoDbLocalPort || '27017'
    const localUrl = `mongodb://localhost:${mongoDbLocalPort}/${dbName}`
    const remoteUrl = `mongodb+srv://${process.env.account}:${process.env.password}@cluster0.5mk4u.mongodb.net/${dbName}?retryWrites=true&w=majority`
    const dbUrl = process.env.dbRemote ? remoteUrl : localUrl
    console.log('dburl', dbUrl)

    mongoose
        .connect(dbUrl)
        .then(() => console.log('資料庫連接成功'))
        .catch(() => console.log('資料庫連接錯誤'))
}

module.exports = (dbName) => {
    initMongoDB(dbName)
}