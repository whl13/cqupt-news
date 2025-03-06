const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userType = {
    username: String,
    password: String,
    sex: String,
    role: Number,
    introduction: String,
    gender: Number,
    avatar: String,
}
const userModel = mongoose.model('user', new Schema(userType))
module.exports = userModel