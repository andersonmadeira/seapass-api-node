const express = require('express')
const mongoose = require('mongoose')
const { Entry } = require('../models')
const { jwtVerify } = require('../middlewares')

const router = express.Router()

router.use(jwtVerify)

router.get('/', async function(req, res) {
  Entry.find().then(
    entries => {
      res.json(entries)
    },
    error => {
      res.json({ message: error })
    }
  )
})

router.get('/:id', function(req, res) {
  const { id } = req.params

  Entry.findById(id, function(err, entry) {
    if (err) {
      res.status(500).send(err)
    }

    res.json(entry)
  })
})

router.post('/', function(req, res) {
  const extras = req.body.extras.map(e => {
    return { name: e.name, value: e.value }
  })

  const entry = new Entry({
    name: req.body.name,
    description: req.body.description,
    credentials: {
      hostname: req.body.credentials.hostname,
      username: req.body.credentials.username,
      password: req.body.credentials.password,
    },
    extras: extras,
    author: req.user._id,
  })

  entry.save().then(
    entry => {
      res.send(entry)
    },
    error => {
      res.status(500).send(error)
    }
  )
})

router.patch('/:id', function(req, res) {
  const extras = req.body.extras.map(e => {
    return { name: e.name, value: e.value }
  })

  const entry = {
    name: req.body.name,
    description: req.body.description,
    credentials: {
      hostname: req.body.credentials.hostname,
      username: req.body.credentials.username,
      password: req.body.credentials.password,
    },
    extras: extras,
    author: req.user._id,
  }

  Entry.updateOne({ _id: req.params.id }, entry, function(err, result) {
    if (err) {
      res.status(500).send(err)
    }

    res.json(result)
  })
})

router.delete('/:id', function(req, res) {
  Entry.deleteOne({ _id: req.params.id }, function(err, result) {
    if (err) {
      res.status(500).send(err)
    }

    res.send(result)
  })
})

module.exports = router
