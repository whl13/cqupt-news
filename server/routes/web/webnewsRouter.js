var express = require('express');
var webnewsRouter = express.Router();
const newsController = require('../../controllers/web/newsController');
webnewsRouter.get('/webapi/news/getnewslist', newsController.getnewslist)
webnewsRouter.get('/webapi/news/getnewslist/:id', newsController.getnewslist)
webnewsRouter.get('/webapi/news/gettoplist', newsController.gettoplist)
module.exports = webnewsRouter;