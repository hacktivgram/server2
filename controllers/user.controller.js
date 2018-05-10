require('dotenv').config();
const User   = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

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
          user
        })
      }
    })
  },
  login: (req, res) => {
    User.findOne({
        email: req.body.email
      })
      .then(user => {
        if(bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign({
            id: user._id,
            email: user.email,
          }, secret)
          res.status(200).json({
            message: 'sign in success',
            token
          })
        } else {
          res.status(404).json({
            message: 'user not found'
          })
        }
      })
      .catch(err => {
        res.status(404).send(err)
      })
  },
  getAllUsers: function (req, res) {
    Users.find()
      .then((users) => {
        res.status(200).json({
          message: "user information retrieved",
          users
        })
      })
      .catch(err => {
        res.status(400).json({
          message: "failed to retrieve data",
          err
        })
      })
  },
  getUserInfo: function (req, res) {
    User.findOne({
        _id: req.decoded.id
      })
      .then((user) => {
        if(user === null) {
          res.status(400).json({
            message: 'user not found',
            err
          })
        } else {
          res.status(200).json({
              message: "user information found",
              users
            })
            .catch((err) => {
              res.status(400).json({
                message: "failed to retrieve data",
                err
              })
            })
        }
      })
  },
  update: (req, res) => {
    User.update({
        _id: req.params.id
      }, {
        $set: {
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
          user
        })
      })
      .catch(err => {
        res.status(400).json({
          message: "failed to update user data",
          err
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
          message: "user deleted",
          user
        })
      })
      .catch(err => {
        res.status(400).json({
          message: "failed to delete user record",
          err
        })
      })
  },
  logout: (req, res) => {
    res.status(200).json({
      message: 'server is connected'
    })
  },


}
