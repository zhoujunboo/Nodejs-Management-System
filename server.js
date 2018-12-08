const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');

const db = require('./src/db/connect.js')
//解析post
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//配置静态目录getBanner
app.use(express.static(path.join(__dirname, './static')));

//路由相关 区分前台后台
const admin = require('./src/router/admin.js');
const home = require('./src/router/home.js');
const upload = require('./src/router/upload.js');
const aduser = require('./src/router/aduser.js');
app.use('/admin/aduser', aduser);
app.use('/admin', admin);
app.use('/home', home);
app.use('/upload', upload);

app.listen(3000, () => {
    console.log('host port 3000 server is start');
})