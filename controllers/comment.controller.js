const Comment  = require('../models/comment.model');

module.exports = {
  create: function (req, res) {
    Comment.create({
      comment: req.body.comment,
      userId: req.user.userId,
      photoId: req.params.id
    }, (err, comment) => {
      if(err) {
        res.status(400).json({
          message: "comment creation failed, please try again",
          err: err
        })
      } else {
        res.status(200).json({
          message: "comment successfully created",
          data: comment
        })
      }
    })
  },
  getComment: function (req, res) {
    Comment.find()
      .populate('user')
      .then(response => {
        res.status(200).json({
          message: 'success get all comment user',
          comment: response
        })
      })
      .catch((err) => {
        res.status(500).json({
          error: err
        })
      })
  },
  getCommentByUser: function (req, res) {
    Comment.find({
        userId: req.user.userId
      })
      .populate('user')
      .then(response => {
        let commentArr = []
        response.forEach(data => {
          commentArr.push(data.comment)
        })
        res.status(200).json({
          message: 'success get comment user',
          commment: commentArr,
          userId: req.user.userId
        })
      })
      .catch((err) => {
        res.status(500).json({
          error: err
        })
      })
  }
}
