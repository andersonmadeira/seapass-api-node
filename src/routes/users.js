const express = require('express')
const mongoose = require('mongoose')
const { User } = require('../models')
const { jwtVerify } = require('../middlewares')

const router = express.Router()

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.use(jwtVerify)

router.get('/', async function(req, res) {
  User.find().then(
    users => {
      res.json(users)
    },
    error => {
      res.json({ message: error })
    }
  )
})

router.get('/:id', function(req, res) {
  const { id } = req.params

  User.findById(id, function(err, user) {
    if (err) {
      res.status(500).send(err)
    }

    res.json(user)
  })
})

router.post('/', function(req, res) {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  })

  user.save().then(
    user => {
      res.send(user)
    },
    error => {
      res.status(500).send(error)
    }
  )
})

router.patch('/:id', function(req, res) {
  const user = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  }

  User.updateOne({ _id: req.params.id }, user, function(err, result) {
    if (err) {
      res.status(500).send(err)
    }

    res.json(result)
  })
})

router.delete('/:id', function(req, res) {
  User.deleteOne({ _id: req.params.id }, function(err, result) {
    if (err) {
      res.status(500).send(err)
    }

    res.send(result)
  })
})

module.exports = router
