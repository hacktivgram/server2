require('dotenv').config();
const User     = require('../models/user.model');
const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');
const secret   = process.env.SECRET_KEY;

module.exports = {
  signup: (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      biography: req.body.biography
    }, (err, user) => {
      if(err) {
        res.status(400).json({
          message: "user creation failed, please try again",
          err: err
        })
      } else {
        res.status(200).json({
          message: "user successfully created",
          data: user
        })
      }
    })
  },
  login: (req, res) => {
    User.findOne({
        email: req.body.email
      })
      .then(function(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign({userId: user._id, userEmail: user.email}, `${secret}`)
          res.status(200).json({
            message: 'log in success',
            token: token
          })
        } else {
          res.status(404).json({
            message: 'wrong password'
          })
        }
      })
      .catch(err => {
        res.status(404).json({
          message: 'user not found'
        })
      })
  },
  getAllUsers: function (req, res) {
    Users.find()
      .then((users) => {
        res.status(200).json({
          message: "user information retrieved",
          data: users
        })
      })
      .catch(err => {
        res.status(400).json({
          message: "failed to retrieve data",
          error: err
        })
      })
  },
  getUserInfo: function (req, res) {
    User.findOne({
        _id: req.user.userId
      })
      .then((user) => {
        if(user === null) {
          res.status(400).json({
            message: 'user not found'
          })
        } else {
          res.status(200).json({
              message: "user information found",
              data: user
            })
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: "failed to retrieve data",
          error: err
        })
      })
  },
  update: (req, res) => {
    User.update({
        _id: req.user.userId
      }, {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          biography: req.body.biography
        }
      }, {
        runValidators: true,
        setDefaultsOnInsert: true
      })
      .exec()
      .then(user => {
        res.status(200).json({
          message: "user fields have been updated",
          data: user
        })
      })
      .catch(err => {
        res.status(400).json({
          message: "failed to update user data",
          error: err
        })
      })
  },
  destroy: (req, res) => {
    User.deleteOne({
        _id: req.params.id
      })
      .exec()
      .then(user => {
        res.status(200).json({
          message: "user deleted"
        })
      })
      .catch(err => {
        res.status(400).json({
          message: "failed to delete user record",
          error: err
        })
      })
  }
}
