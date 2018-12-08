//后台Banner接口
const Banner = require('../db/model/bannerModel.js');
const tools = require('../tools/tools.js')
//添加Banner
let getBanner = (req, res) => {
    Banner.find()
        .then((data) => {
            res.send({ err: 0, msg: 'getBanner success', data: data })
        }).catch((err) => {
            res.send({ err: -1, msg: 'getBanner failed' })
        })
}
//通过id获取Banner信息
let getBannerById= (req, res) => {
    let id = req.body.id;
    Banner.find({ _id: id })
        .then((data) => {
            res.send({ err: 0, msg: 'getBannerById success', data: data })
        }).catch((err) => {
            res.send({ err: -1, msg: 'getBannerById failed' })
        })
}
//模糊查询Banner信息
let getBannerByKw=(req, res) => {
    let keyword = req.body.keyword;
    let reg = new RegExp(keyword);
    //匹配多个字段
    Banner.find({
            $or: [
                { name: { $regex: reg } },
                { url: { $regex: reg } }
            ]
        })
        .then((data) => {
            res.send({ err: 0, msg: 'getBannerByKw success', data: data })
        }).catch((err) => {
            res.send({ err: -1, msg: 'getBannerByKw failed' })
        })
}
//分页查询Banner信息
let getBannerByPage=(req, res) => {
    //给定一个默认值
    let page = Number(req.body.page) || 1;
    let pageSize = Number(req.body.pageSize) || 3;
    let total = 0;
    Banner.find()
        .then((data) => {
            total = data.length;
            return Banner.find().skip(pageSize * (page - 1)).limit(pageSize)
        })
        .then((data) => {
            let obj = {
                list: data, //某一页的具体信息
                total: total, //总的数据条数
                pageSize: pageSize, //每页显示条数
                nowPage: page //当前页数
            }
            res.send({ err: 0, msg: 'getBannerByPage success', data: obj })
        }).catch((err) => {
            res.send({ err: -1, msg: 'getBannerByPage failed' })
        })
}
//通过id删除Bannner信息
let delBanner=(req, res) => {
    let id = req.body.id;
    Banner.deleteOne({ _id: id })
        .then((data) => {
            res.send({ err: 0, msg: 'delBanner success' })
        }).catch((err) => {
            res.send({ err: -1, msg: 'delBanner failed' });
        })
}
//添加Banner信息
let addBanner=(req, res) => {
    let { imgPath, url, name } = req.body;
    Banner.insertMany({ imgPath, url, name })
        .then((data) => {
            console.log('addBanner success！')
            res.send({ err: 0, msg: 'addBanner success' })
        }).catch((err) => {
            console.log('addBanner failed')
            res.send({ err: -1, msg: 'addBanner failed' })
        })
}
//通过id修改Banner
let  updateBanner=(req, res) => {
    let { id, imgPath, url, name } = req.body;
    //这里第三个参数并没有写
    Banner.update({ _id: id }, { imgPath, url, name })
        .then((data) => {
            res.send({ err: 0, msg: 'updateBanner success' })
        }).catch((err) => {
            res.send({ err: -1, msg: 'updateBanner failed' })
        })
}
//修改发布状态
let pushBanner=(req, res) => {
    let { id, push } = req.body
    Banner.update({ _id: id }, { push })
        .then((data) => {
            res.send({ err: 0, msg: '发布ok' })
        })
        .catch((err) => {
            res.send({ err: -1, msg: '发布nook' })
        })
}
//分类查询(未写)
//批量删除Banner
let delBanners=(req,res)=>{
    let ids=req.body.ids.split('/');
    ids.length=ids.length-1;
    Banner.deleteMany({_id:{$in:ids}})
        .then((data) => {
            res.send({ err: 0, msg: 'delBanners success' })
        }).catch((err) => {
            res.send({ err: -1, msg: 'delBanners failed' });
        })
}
module.exports = {
    getBanner,
    getBannerById,
    getBannerByKw,
    getBannerByPage,
    delBanner,
    delBanners,
    addBanner,
    updateBanner,
    pushBanner
}