const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const usersRouter = require('./routes/users')

mongoose.connect('mongodb://localhost:27017/seapass', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()
const port = 3000

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', usersRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
