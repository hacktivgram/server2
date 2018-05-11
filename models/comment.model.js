const mongoose    = require('mongoose')
const Schema      = mongoose.Schema

const commentSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  photoId: {
    type: Schema.Types.ObjectId,
    ref: "Photo"
  },
  comment: {
    type: String
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  updated_at: Date,
}, {
  timestamps: true
})

commentSchema.pre('update', function () {
  this.updated_at({}, {
    $set: {
      updated_at: new Date()
    }
  })
})

module.exports = mongoose.model('comments', commentSchema)
