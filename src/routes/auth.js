const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { jwtVerify } = require('../middlewares')

const router = express.Router()

router.post('/login', async function(req, res) {
  const user = User.findOne(
    {
      username: req.body.username,
      password: req.body.password,
    },
    function(err, user) {
      if (err) {
        res.status(500).json({ message: err })
      }

      if (!user) {
        return res.status(404).json({ message: 'Not Found' })
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 30,
      })

      res.header('Authorization', `Bearer ${token}`)

      return res.json({ user })
    }
  )
})

router.get('/user', jwtVerify, async function(req, res) {
  res.json(req.user)
})

module.exports = router
