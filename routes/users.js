const express     = require('express');
const user        = express.Router();
const {
  getUserInfo,
  login,
  update,
  signup,
  getAllUsers,
  destroy
}                 = require('../controllers/user.controller.js');
const {
  getPhoto,
  addLike,
  upload,
  deletePhoto
}                 = require('../controllers/photo.controller.js');

const { create, getComment, getCommentByUser }  = require('../controllers/comment.controller.js');
const { isLogin } = require('../middlewares/auth');
const images      = require('../middlewares/uploadImage');


user
  .get('/', isLogin, getUserInfo)
  .post('/login', login)
  .post('/update', isLogin, update)
  .post('/signup', signup)
  .get('/get-photo', getPhoto)
  .post('/add-comment/:id', isLogin, create)
  .get('/get-all-comment', getComment)
  .get('/get-comment',isLogin, getCommentByUser)
  .post('/add-like/:id', addLike)
  .post('/upload',
    isLogin,
    images.multer.single('image'),
    images.sendUploadToGCS,
    upload)
  .delete('/delete-photo/:id', isLogin, deletePhoto)
  .delete('/delete/:id', isLogin, destroy)


module.exports = user
