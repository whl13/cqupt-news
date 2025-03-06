const productService = require('../../services/admin/productService')
const productController = {
    addproduct: async (req, res) => {
        const { title, introduction, detail } = req.body
        const cover = `/productuploads/${req.file.filename}`
        await productService.addproduct({ title, introduction, detail, cover, editTime: new Date() }).then(result => {
            res.send({
                code: 200,
                msg: '添加成功'
            })
        })
    },
    getlist: async (req, res) => {
        console.log(req.params.id);
        await productService.getlist({ _id: req.params.id }).then(result => {
            res.send({
                code: 200,
                data: result
            })
        })
    },
    update: async (req, res) => {
        const { _id, title, introduction, detail } = req.body
        const cover = req.file ? `/productuploads/${req.file.filename}` : req.body.cover
        await productService.update({ _id, title, introduction, detail, cover, editTime: new Date() }).then(result => {
            res.send({
                code: 200,
                msg: '修改成功'
            })
        })
    },
    delete: async (req, res) => {
        await productService.delete({ _id: req.params.id }).then(result => {
            res.send({
                code: 200,
                msg: '删除成功'
            })
        })
    }
}
module.exports = productController