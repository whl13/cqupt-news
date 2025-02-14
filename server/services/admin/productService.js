const productModel = require('../../models/productModel')
const productService = {
    addproduct: async ({ title, introduction, detail, cover, editTime }) => {
        return productModel.create({ title, introduction, detail, cover, editTime })
    },
    getlist: async ({ _id }) => {
        return _id ? productModel.find({ _id }) : productModel.find({})
    },
    update: async ({ _id, title, introduction, detail, cover, editTime }) => {
        return productModel.updateOne({ _id }, { title, introduction, detail, cover, editTime })
    },
    delete: async ({ _id }) => {
        return productModel.deleteOne({ _id })
    },
}
module.exports = productService