const newsModel = require('../../models/newsModel')
const newsService = {
    getnewslist: async ({ _id }) => {
        return _id ? newsModel.find({ _id, isPublish: 1 }) : (await newsModel.find({ isPublish: 1 }).sort({ editTime: -1 }))
    },
    gettoplist: async ({ limit }) => {
        return await newsModel.find({ isPublish: 1 }).sort({ editTime: -1 }).limit(limit)
    },
}
module.exports = newsService