const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  password: { type: String },
  email: { type: String },
})

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password)
  }
  next()
})

const User = mongoose.model('User', UserSchema)

module.exports.User = User
