var express = require('express');
var newsRouter = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'public/newsuploads' })
const newsController = require('../../controllers/admin/newsController');

newsRouter.post('/adminapi/news/addnews', upload.single('file'), newsController.addnews);
newsRouter.post('/adminapi/news/updatenews', upload.single('file'), newsController.updatenews);
newsRouter.get('/adminapi/news/getnewslist', newsController.getnewslist)
newsRouter.get('/adminapi/news/getnewslist/:id', newsController.getnewslist)
newsRouter.put('/adminapi/news/updatePublish', newsController.updatePublish)
newsRouter.delete('/adminapi/news/delnews/:id', newsController.delnews)
module.exports = newsRouter;