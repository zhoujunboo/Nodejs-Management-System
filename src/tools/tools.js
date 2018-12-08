const jwt = require('jsonwebtoken');
const scre = "I_ALWAYS_MISS_YU";

//验证token的中间件
let checkTokenMiddl = (req, res, next) => {
    let token = req.body.token;
    jwt.verify(token, 'I_ALWAYS_MISS_YU', function(err, decoded) {
        if (err) return res.send({ err: -999, msg: 'token验证失败！' })
    });
    next();
}

//创建token
let createToken = (user) => {
    let payload = {
        name: user
    }
    return jwt.sign(payload, scre);
}

module.exports = {
    checkTokenMiddl,
    createToken
}