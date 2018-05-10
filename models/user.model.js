const mongoose   = require('mongoose')
const Schema     = mongoose.Schema
const bycrypt    = require('bcryptjs')
const saltRounds = 10

let userSchema   = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username cannot be empty']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, 'Please use other email address'],
    validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    required: [true, 'email cannot be empty']
  },
  password: {
    type: String,
    required: 'Email address is required',
    min: [8, '8 characters minimum to create password'],
    max: [20, '20 characters maximum to create password'],
    required: [true, 'password cannot be empty']
  },
  biography: {
    type: String
  },
  photo: [{
    type: Schema.Types.ObjectId,
    ref: "Photo"
  }],
  facebook_id: String,
}, {
  timestamps: true
})

// hooks for hashing password
userSchema.pre('save', function (next) {
  let user = this
  bycrypt.genSalt(saltRounds, function (err, salt) {
    if(err) return next(err)
    bycrypt.hash(user.password, salt, function (err, hash) {
      if(err) return next(err)
      user.password = hash
      next()
    })
  })
})
userSchema.pre('update', function (next) {
  let user = this
  if(user._update.$set.password) {
    bycrypt.genSalt(saltRounds, function (err, salt) {
      if(err) return next(err)
      bycrypt.hash(user._update.$set.password, salt, function (err, hash) {
        if(err) return next(err)
        user._update.$set.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

module.exports = mongoose.model('users', userSchema)
