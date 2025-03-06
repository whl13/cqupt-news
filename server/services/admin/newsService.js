const newsModel = require('../../models/newsModel')
const newsService = {
    addnews: async ({ title, content, category, cover, isPublish, editTime }) => {
        return newsModel.create({
            title,
            content,
            category,
            cover,
            isPublish,
            editTime
        })
    },
    getnewslist: async ({ _id }) => {
        return _id ? newsModel.find({ _id }) : newsModel.find({})
    },
    updatePublish: async ({ _id, isPublish, editTime }) => {
        return newsModel.updateOne({ _id }, { isPublish, editTime })
    },
    updatenews: async ({ _id, title, content, category, cover, isPublish, editTime }) => {
        return newsModel.updateOne({ _id }, { title, content, category, cover, isPublish, editTime })
    },
    delnews: async ({ _id }) => {
        return newsModel.deleteOne({ _id })
    },
}
module.exports = newsService