const productService = require('../../services/web/productService')
const productController = {
    getproductlist: async (req, res) => {
        await productService.getproductlist({ _id: req.params.id }).then(result => {
            res.send({
                code: 200,
                data: result
            })
        })
    }
}
module.exports = productController