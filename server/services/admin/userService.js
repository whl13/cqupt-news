const userModel = require('../../models/userModel');
const userService = {
    login: async ({ username, password }) => {
        return userModel.find({
            username,
            password
        })
    },
    update: async ({ _id, username, password, sex, introduction, gender, avatar }) => {
        const updateFields = { username, sex, introduction, gender };
        console.log(avatar);

        if (avatar) {
            updateFields.avatar = avatar;
        }
        if (password !== 'undefined') {
            updateFields.password = password;
        }
        console.log(updateFields);
        return userModel.updateOne({
            _id
        },
            updateFields)
    },
    adduser: async ({ username, password, introduction, role, sex, avatar }) => {
        return userModel.create({
            username,
            password,
            introduction,
            role,
            sex,
            avatar
        })
    },
    getuserlist: async (_id) => {
        return _id ? userModel.find({ _id }, ['username', 'role', 'password', 'avatar', 'introduction']) : userModel.find({}, ['username', 'role', 'avatar', 'introduction'])
    },
    updateuser: async ({ _id, username, password, introduction, role }) => {
        return userModel.updateOne({
            _id
        },
            {
                username,
                password,
                introduction,
                role,
            })
    },
    deluser: async (_id) => {
        return userModel.deleteOne({
            _id
        })
    },
}

module.exports = userService;