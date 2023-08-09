const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

const userRouter = require('./routes/user')
const dbconfig = require('./config/dbconfig')
const errorController = require('./controller/error')

const app = express()

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

const port = process.env.PORT || 3000

app.use('/user', userRouter)

mongoose.connect(dbconfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('connected to database')
}).catch((err) => {
    console.log('failed to connect to database', err)
    process.exit()
})

app.use(errorController.get404)

app.listen(port)