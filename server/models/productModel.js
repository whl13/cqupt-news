const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productType = {
    title: String,
    introduction: String,
    detail: String,
    cover: String,
    editTime: Date
}
const productModel = mongoose.model('product', new Schema(productType))
module.exports = productModel