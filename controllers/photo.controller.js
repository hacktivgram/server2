const User = require('../models/user.model');
const Photo = require('../models/photo.model');

module.exports = {
  upload: function (req, res) {
    let userId = req.user.userId
    User.findOne({
        _id: userId
      })
      .then(function (user) {
        console.log('masuk then')
        if(user == null) {
          res.status(400).json({
            message: 'user not found'
          })
        }
        let newPhoto = {
          image: req.file.cloudStoragePublicUrl,
          caption: req.body.caption,
        }
        let photo = new Photo(newPhoto)
        photo.save()
          .then((response) => {
            res.status(200).json({
              message: 'Your file is successfully uploaded',
              link: req.file.cloudStoragePublicUrl
            })
          })
          .catch((err) => {
            console.log('masuk catch')
            res.status(500).json({
              error: err
            })
          })
      })
      .catch((err) => {
        res.status(500).json({
          error: err
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
  addLike: function (req, res) {
    let likeArr = []
    likeArr.push(req.user.userId)
    Photo.findOneAndUpdate({
        _id: req.params.id
      }, {
        $set: {
          like: likeArr
        }
      })
      .then(likePhoto => {
        res.status(200).json({
          message: "photo fields have been added like",
          userId: req.user.userId,
          likePhoto
        })
      })
      .catch(err => {
        console.log('masuk catch');
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
