var express = require('express');
var productRouter = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'public/productuploads' })
const productController = require('../../controllers/admin/productController');

productRouter.post('/adminapi/product/addproduct', upload.single('file'), productController.addproduct);
productRouter.post('/adminapi/product/update', upload.single('file'), productController.update);
productRouter.get('/adminapi/product/getlist', productController.getlist)
productRouter.get('/adminapi/product/getlist/:id', productController.getlist)
productRouter.delete('/adminapi/product/delete/:id', productController.delete)
module.exports = productRouter;