const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv-safe')

dotenv.config()

const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const entriesRouter = require('./routes/entries')

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
app.use('/entries', entriesRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
