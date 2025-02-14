const jsonwebtoken = require('jsonwebtoken');
const secret = 'secret';
const JWT = {
    generate(value, expires) {
        return jsonwebtoken.sign(
            value, secret, {
            // 设置过期时间
            expiresIn: expires
        });
    },
    verify(token) {
        try {
            return jsonwebtoken.verify(token, secret);
        } catch (error) {
            return false;
        }
    }
}
module.exports = JWT;