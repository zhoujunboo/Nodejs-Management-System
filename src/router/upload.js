const express = require('express');
const multer = require('multer')
const UploadCtr=require('../controller/upload.controller.js')

//图片上传接口
const router = express.Router();
router.post('/img', multer({ dest: '/tmp/' }).single('test'), UploadCtr.Upload);
module.exports = router