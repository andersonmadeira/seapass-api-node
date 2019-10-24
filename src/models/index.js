const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const ObjectId = mongoose.Schema.Types.ObjectId

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

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  author: ObjectId,
})

const Category = mongoose.model('Category', CategorySchema)

const EntrySchema = new mongoose.Schema({
  name: String,
  description: String,
  author: ObjectId,
  category: ObjectId,
  credentials: {
    hostname: String,
    username: String,
    password: String,
  },
  extras: [
    {
      _id: false,
      name: String,
      value: String,
    },
  ],
})

const Entry = mongoose.model('Entry', EntrySchema)

module.exports.User = User
module.exports.Category = Category
module.exports.Entry = Entry
