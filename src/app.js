const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv-safe')

dotenv.config()

const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')

mongoose.connect('mongodb://localhost:27017/seapass', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()
const port = 3000

app.use(helmet())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', usersRouter)
app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
