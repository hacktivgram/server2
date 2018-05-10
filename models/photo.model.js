const mongoose    = require('mongoose')
const Schema      = mongoose.Schema

const photoSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  image: {
    type: String
  },
  caption: {
    type: String
  },
  comment: [{
    type: String
  }],
  like: [{
    type: Number
  }],
  created_at: {
    type: Date,
    default: new Date()
  },
  updated_at: Date,
}, {
  timestamps: true
})

photoSchema.pre('update', function () {
  this.updated_at({}, {
    $set: {
      updated_at: new Date()
    }
  })
})

module.exports = mongoose.model('photos', photoSchema)
