const express = require('express');
const user    = express.Router();
const {
  getUserInfo,
  login,
  update,
  signup,
  getAllUsers,
  destroy,
  logout
}             = require('../controllers/user.controller.js');
const {
  getPhoto,
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
  .get('/get-photo', getPhoto)
  .post('/add-comment', addComment)
  .post('/add-like', addLike)
  .post('/upload',
    isLogin,
    images.multer.single('image'),
    images.sendUploadToGCS,
    upload)
  .delete('/delete-photo/:id', isLogin, deletePhoto)
  .delete('/delete/:id', isLogin, destroy)
  .get('/logout', isLogin, logout);


module.exports = user
