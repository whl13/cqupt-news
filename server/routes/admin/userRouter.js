var express = require('express');
var userRouter = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'public/avtaruploads' })
const userController = require('../../controllers/admin/userController');
userRouter.post('/adminapi/user/login', userController.login);
userRouter.post('/adminapi/user/update', upload.single('file'), userController.update);
userRouter.post('/adminapi/user/adduser', upload.single('file'), userController.adduser);

userRouter.get('/adminapi/user/getuserlist', userController.getuserlist);
userRouter.get('/adminapi/user/getuserlist/:id', userController.getuserlist);
userRouter.put('/adminapi/user/getuserlist/:id', userController.updateuser);
userRouter.delete('/adminapi/user/deluser/:id', userController.deluser);
module.exports = userRouter;
