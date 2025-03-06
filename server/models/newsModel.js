const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newsType = {
    title: String,
    content: String,
    category: Number,//1,2,3
    isPublish: Number, //0,1
    cover: String,
    editTime: Date
}
const newsModel = mongoose.model('news', new Schema(newsType))
module.exports = newsModel