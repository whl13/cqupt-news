const productModel = require('../../models/productModel')
const productService = {
    getproductlist: async ({ _id }) => {
        return _id ? productModel.find({ _id }) : await productModel.find({})
    }
}
module.exports = productService