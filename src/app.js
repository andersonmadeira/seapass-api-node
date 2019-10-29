const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv-safe')

dotenv.config()

const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const categoriesRouter = require('./routes/categories')
const entriesRouter = require('./routes/entries')

mongoose.connect('mongodb://localhost:27017/seapass', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()
const port = 3001

app.use(helmet())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/entries', entriesRouter)
app.use('/api/categories', categoriesRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
