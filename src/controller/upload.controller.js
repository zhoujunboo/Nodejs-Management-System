
const fs = require('fs');
const path = require('path');
//图片上传
let Upload=(req, res) => {
    fs.readFile(req.file.path, (err, data) => {
        if (err) return res.send('上传失败');
        console.log(req.file);
        let filename = new Date().getTime() + parseInt(Math.random() * 99999) + "." +
            req.file.mimetype.split('/')[1];
        let dir = '../../static/img/';
        fs.writeFile(path.join(__dirname, dir, filename), data, (err) => {
            if (err) return res.send({ err: -1, msg: '写入失败' })
            res.send({ err: 0, msg: '上传成功', data: '/img/' + filename })
        })
    })
}

module.exports={
	Upload
}