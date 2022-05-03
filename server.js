/* init basic express app */
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.port || 8080

/* require config */
require('dotenv').config()

/* connect to mongoDB */
const dbName = "socialNetwork"
require('./mongodb')(dbName)

/* init routes */
require('./routes')(app)
app.listen(port)
