const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const adUser  = require('../db/model/adminModel.js');
const tools = require('../tools/tools.js')

//用户注册
/*let reg = (req, res) => {
    let { user, pass } = req.body
    User.find({ user })
        .then((data) => {
            if (data.length >= 1) throw '用户名存在'
            // 加密操作
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(pass, salt);
            return User.insertMany({ user: user, pass: hash })
        })
        .then((data) => {
            res.send({ err: 0, msg: '注册成功！' })
        })
        .catch((error) => {
            res.send({ err: -1, msg: error })
        })
}*/

//用户登录
let login = (req, res) => {
    let { user, pass } = req.body
    console.log(req.body);
    adUser.find({ name:user })
        .then((data) => {
            if (!data.length >= 1) throw '该用户不存在';
            if(!(data[0]['pass']==pass))  throw '用户名或密码错误!';
            //产生token
            let token = tools.createToken(user);
            res.send({ err: 0, msg: '登录成功', token: token })
        })
        .catch((err) => {
            res.send({ err: -1, msg: err })
        })
}

module.exports = {
    login
}
