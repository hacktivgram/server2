const User  = require('../models/photo.model');
const Photo = require('../models/photo.model');

module.exports = {
  upload: function (req, res) {
    let userId = req.decoded.id
    User.findOne({
        _id: userId
      })
      .exec()
      .then((user) => {
        if(tag == null) {
          res.status(400).json({
            message: 'user not found',
            err
          })
        }
        let newPhoto = {
          image: req.file.cloudStoragePublicUrl,
          caption: req.body.caption,
        }
        let photo = new Photo(newPhoto)
        Photo.save()
          .then((response) => {
            res.status(200).json({
              message: 'Your file is successfully uploaded',
              link: req.file.cloudStoragePublicUrl
            })
          })
          .catch((err) => {
            res.status(500).json({
              err
            })
          })
      })
      .catch((err) => {
        res.status(500).json({
          err
        })
      })
  },
  getPhoto: function (req, res) {
    Photo.find()
      .populate('user')
      .exec()
      .then((response) => {
        res.status(200).json({
            message: 'success get all items data',
            photo: response
          })
          .catch((err) => {
            res.status(500).json({
              err
            });
          });
      });
  },
  addComment: function (req, res) {
    Photo.update({
        _id: req.params.id
      }, {
        $set: {
          comment: req.body.comment
        }
      }, {
        runValidators: true,
        setDefaultsOnInsert: true
      })
      .exec()
      .then(photo => {
        res.status(200).json({
          message: "photo fields have been added comment",
          photo
        })
      })
      .catch(err => {
        res.status(400).json({
          message: "failed to added comment photo",
          err
        })
      })
  },
  addLike: function (req, res) {
    Photo.update({
        _id: req.params.id
      }, {
        $set: {
          like: req.body.like
        }
      }, {
        runValidators: true,
        setDefaultsOnInsert: true
      })
      .exec()
      .then(photo => {
        res.status(200).json({
          message: "photo fields have been added like",
          photo
        })
      })
      .catch(err => {
        res.status(400).json({
          message: "failed to added like photo",
          err
        })
      })
  },
  deletePhoto: (req, res) => {
    Photo.deleteOne({
        _id: req.params.id
      })
      .exec()
      .then(photo => {
        res.status(200).json({
          message: "photo deleted",
          photo
        })
      })
      .catch(err => {
        res.status(400).json({
          message: "failed to delete photo record",
          err
        })
      })
  },
}
