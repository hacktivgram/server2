const express = require('express');
const user    = express.Router();
const {
  getUserInfo,
  login,
  update,
  signup,
  getAllUsers,
  destroy,
  logout,
  usernameValidate,
  emailValidate
}             = require('../controllers/user.controller.js');
const {
  getPhoto,
  getAllPhoto,
  addComment,
  addLike,
  upload,
  deletePhoto
}             = require('../controllers/photo.controller.js');
const { isLogin } = require('../middlewares/auth');
const images  = require('../middlewares/uploadImage');


user
  .get('/', isLogin, getUserInfo)
  .post('/login', login)
  .post('/update', isLogin, update)
  .post('/signup', signup)
  .get('/get-photo', isLogin, getPhoto)
  .get('/get-all-photo', getAllPhoto)
  .post('/forusernamevalidate', usernameValidate)
  .post('/foremailvalidate', emailValidate)
  .post('/add-comment', addComment)
  .post('/add-like/:id', addLike)
  .post('/upload',
    isLogin,
    images.multer.single('image'),
    images.sendUploadToGCS,
    upload)
  .delete('/delete-photo/:id', isLogin, deletePhoto)
  .delete('/delete/:id', isLogin, destroy)


module.exports = user
