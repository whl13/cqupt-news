const newsService = require('../../services/web/newsService')
const newsController = {
    getnewslist: async (req, res) => {
        await newsService.getnewslist({ _id: req.params.id }).then(result => {
            res.send({
                code: 200,
                data: result
            })
        })
    },
    gettoplist: async (req, res) => {
        await newsService.gettoplist({ limit: req.query.limit }).then(result => {
            res.send({
                code: 200,
                data: result
            })
        })
    },
}
module.exports = newsController