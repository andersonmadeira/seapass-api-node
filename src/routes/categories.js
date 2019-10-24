const express = require('express')
const mongoose = require('mongoose')
const { Category, Entry } = require('../models')
const { jwtVerify } = require('../middlewares')

const router = express.Router()

router.use(jwtVerify)

router.get('/', async function(req, res) {
  Category.find().then(
    categories => {
      res.json(categories)
    },
    error => {
      res.json({ message: error })
    }
  )
})

router.get('/:id', function(req, res) {
  const { id } = req.params

  Category.findById(id, function(err, category) {
    if (err) {
      res.status(500).send(err)
    }

    res.json(category)
  })
})

router.post('/', function(req, res) {
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
    author: req.user._id,
  })

  category.save().then(
    category => {
      res.send(category)
    },
    error => {
      res.status(500).send(error)
    }
  )
})

router.patch('/:id', function(req, res) {
  const category = {
    name: req.body.name,
    description: req.body.description,
  }

  Category.updateOne({ _id: req.params.id }, category, function(err, result) {
    if (err) {
      res.status(500).send(err)
    }

    res.json(result)
  })
})

router.delete('/:id', function(req, res) {
  Category.deleteOne({ _id: req.params.id }, function(err, result) {
    if (err) {
      res.status(500).send(err)
    }

    res.send(result)
  })
})

router.get('/:id/entries', function(req, res) {
  Entry.find({ category: req.params.id }, function(err, entries) {
    if (err) {
      res.status(500).send(err)
    }

    res.json(entries)
  })
})

module.exports = router
