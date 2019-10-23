const express = require('express')
const router = express.Router()

let users = [
  {
    name: 'Fulano',
    email: 'fulano@email.com',
  },
  {
    name: 'Beltrano',
    email: 'beltrano@email.com',
  },
]

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', function(req, res) {
  res.json(users)
})

module.exports = router
