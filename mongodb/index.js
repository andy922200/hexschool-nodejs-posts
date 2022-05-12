const mongoose = require('mongoose');

function initMongoDB(dbName=""){
    const mongoDbLocalPort = process.env.mongoDbLocalPort || '27017'
    const localUrl = `mongodb://localhost:${mongoDbLocalPort}/${dbName}`
    const remoteUrl = `mongodb+srv://${process.env.account}:${process.env.password}@cluster0.5mk4u.mongodb.net/${dbName}?retryWrites=true&w=majority`
    const dbUrl = process.env.dbRemote === 'true' ? remoteUrl : localUrl
    console.log('dburl', dbUrl)

    mongoose.connect(dbUrl)
    const db = mongoose.connection

    db.once('open', () => {
        console.log('資料庫連接成功')
    })

    db.on('error', (error) => {
        console.log('資料庫連接錯誤')
    })

    return db
}


module.exports = (dbName) => {
    const mongoDB = initMongoDB(dbName)
    return mongoDB
}