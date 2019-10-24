const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  email: String,
})

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password)
  }
  next()
})

const User = mongoose.model('User', UserSchema)

const EntrySchema = new mongoose.Schema({
  name: String,
  description: String,
  credentials: {
    hostname: String,
    username: String,
    password: String,
  },
  extras: [
    {
      name: String,
      value: String,
    },
  ],
  author: Number,
})

const Entry = mongoose.model('Entry', EntrySchema)

module.exports.User = User
module.exports.Entry = Entry
