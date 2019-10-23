const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const usersRouter = require('./routes/users')

const app = express()
const port = 3000

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', usersRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
