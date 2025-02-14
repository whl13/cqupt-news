const userService = require("../../services/admin/userService")
const JWT = require("../../utils/JWT")
const userController = {
    login: async (req, res) => {
        await userService.login(req.body).then(result => {
            if (result.length === 0) {
                res.send({
                    code: 400,
                    msg: '用户名或密码错误'
                })
            } else {
                const token = JWT.generate({
                    _id: result[0]._id,
                    username: result[0].username
                }, '1d')
                res.header('Authorization', token)
                res.send(
                    {
                        code: 200,
                        msg: '登录成功',
                        data: result[0]
                    }
                )
            }
        })
    },
    update: async (req, res) => {
        const { username, password, introduction, sex } = req.body
        const token = req.headers.authorization.replace('Bearer ', '')
        const avatar = req.file ? `/avtaruploads/${req.file.filename}` : ''
        const payload = JWT.verify(token)
        await userService.update({ _id: payload._id, username, password, introduction, sex, avatar }).then(result => {
            if (avatar) {
                res.send({
                    code: 200,
                    msg: '修改成功',
                    data: { username, introduction, sex, avatar }
                })
            } else {
                res.send({
                    code: 200,
                    msg: '修改成功',
                    data: { username, introduction, sex }
                })
            }
        })
    },
    adduser: async (req, res) => {
        const { username, password, introduction, role } = req.body
        const avatar = `/avtaruploads/${req.file.filename}`
        await userService.adduser({ username, password, introduction, role, avatar, sex: '0' }).then(result => {
            res.send({
                code: 200,
                msg: '添加成功'
            })
        })
    },
    getuserlist: async (req, res) => {
        await userService.getuserlist(req.params.id).then(result => {
            res.send({
                code: 200,
                msg: '获取成功',
                data: result
            })
        })
    },
    updateuser: async (req, res) => {
        await userService.updateuser(req.body).then(result => {
            res.send({
                code: 200,
                msg: '修改成功'
            })
        })
    },
    deluser: async (req, res) => {
        await userService.deluser(req.params.id).then(result => {
            res.send({
                code: 200,
                msg: '删除成功'
            })
        })
    }
}
module.exports = userController