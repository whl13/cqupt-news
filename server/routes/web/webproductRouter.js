var express = require('express');
var webproductRouter = express.Router();
const productController = require('../../controllers/web/productController');
webproductRouter.get('/webapi/product/getproductlist', productController.getproductlist)
module.exports = webproductRouter;