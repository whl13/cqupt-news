const newsService = require('../../services/admin/newsService')
const newsController = {
    addnews: async (req, res) => {
        const { title, content, category, isPublish } = req.body
        const cover = `/newsuploads/${req.file.filename}`
        await newsService.addnews({ title, content, category: Number(category), cover, isPublish: Number(isPublish), editTime: new Date() }).then(result => {
            res.send({
                code: 200,
                msg: '添加成功'
            })
        })
    },
    getnewslist: async (req, res) => {
        console.log(req.params.id);

        await newsService.getnewslist({ _id: req.params.id }).then(result => {
            res.send({
                code: 200,
                data: result
            })
        })
    },
    updatePublish: async (req, res) => {
        await newsService.updatePublish({ ...req.body, editTime: new Date() }).then(result => {
            res.send({
                code: 200,
                msg: '修改成功'
            })
        })
    },
    updatenews: async (req, res) => {
        const { _id, title, content, category, isPublish } = req.body
        const cover = req.file ? `/newsuploads/${req.file.filename}` : req.body.cover
        await newsService.updatenews({ _id, title, content, category: Number(category), cover, isPublish: Number(isPublish), editTime: new Date() }).then(result => {
            res.send({
                code: 200,
                msg: '修改成功'
            })
        })
    },
    delnews: async (req, res) => {
        await newsService.delnews({ _id: req.params.id }).then(result => {
            res.send({
                code: 200,
                msg: '删除成功'
            })
        })
    }
}
module.exports = newsController