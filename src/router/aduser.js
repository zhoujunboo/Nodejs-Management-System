const express = require('express');
const router = express.Router();

const adUserCtr = require('../controller/aduser.controller.js')

//管理员登录注册接口
//router.post('/reg', adUserCtr.reg);
router.post('/login', adUserCtr.login);

module.exports = router;