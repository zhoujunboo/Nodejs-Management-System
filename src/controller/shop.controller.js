
const Shop  = require('../db/model/shopModel.js');
const tools = require('../tools/tools.js')

//获得Shop信息
let getShop=(req,res)=>{
    Shop.find()
    .then((data)=>{
   	 	res.send({ err: 0, msg: 'getShop success', data: data })
    }).catch((err)=>{
    	res.send({ err: -1, msg: 'getShop failed' })
    })
}
//通过id获取Shop信息
let getShopById= (req, res) => {
    let id = req.body.id;
    console.log(id);
    Shop.find({ _id: id })
        .then((data) => {
            res.send({ err: 0, msg: 'getShopById success', data: data })
        }).catch((err) => {
            res.send({ err: -1, msg: 'getShopById failed' })
        })
}
//添加Shop信息
let addShop=(req,res)=>{
    console.log(req.body);
	let {shopImg,shopName,shopDescribe,shopPrice,shopState}=req.body
	Shop.insertMany({shopImg,shopName,shopDescribe,shopPrice,shopState})
	.then((data)=>{
		res.send({err:0,msg:'添加商品信息成功！'})
	})
	.catch((err)=>{
		res.send({err:-1,msg:'添加商品信息失败！'})
	})
}
//通过id修改Shop
let  updateShop=(req, res) => {
    let { id, shopImg,shopName,shopDescribe,shopPrice,shopState} = req.body;
    Shop.updateMany({ _id: id }, {shopImg,shopName,shopDescribe,shopPrice,shopState})
        .then((data) => {
            res.send({ err: 0, msg: 'updateShop success' })
        }).catch((err) => {
            res.send({ err: -1, msg: 'updateShop failed' })
        })
}
//模糊查询Shop信息
let getShopByKw=(req, res) => {
    let keyword = req.body.keyword;
    let reg = new RegExp(keyword);
    Shop.find({
            $or: [
                { shopName: { $regex: reg } }
            ]
        })
        .then((data) => {
            res.send({ err: 0, msg: 'getShopByKw success', data: data })
        }).catch((err) => {
            res.send({ err: -1, msg:'getShopByKw failed'})
        })
}
//分页查询Shop信息
let getShopByPage=(req, res) => {
    let page = Number(req.body.page) || 1;
    let pageSize = Number(req.body.pageSize) || 3;
    let total = 0;
    Shop.find()
        .then((data) => {
            total = data.length;
            return Shop.find().skip(pageSize * (page - 1)).limit(pageSize)
        })
        .then((data) => {
            let obj = {
                list: data, //某一页的具体信息
                total: total, //总的数据条数
                pageSize: pageSize, //每页显示条数
                nowPage: page //当前页数
            }
            res.send({ err: 0, msg: 'getShopByPage success', data: obj })
        }).catch((err) => {
            res.send({ err: -1, msg: 'getShopByPage failed' })
        })
}
//通过id删除Shop信息
let delShop=(req, res) => {
    let id = req.body.id;
    Shop.deleteOne({ _id: id })
        .then((data) => {
            res.send({ err: 0, msg: 'delShop success' })
        }).catch((err) => {
            res.send({ err: -1, msg: 'delShop failed' });
        })
}
//修改Shop发布状态
let pushShopState=(req, res) => {
    let { id, shopState } = req.body
    Shop.updateOne({ _id: id }, { shopState })
        .then((data) => {
            res.send({ err: 0, msg: 'pushShopState success' })
        })
        .catch((err) => {
            res.send({ err: -1, msg: 'pushShopState failed' })
        })
}
//批量删除商品
let delShops=(req,res)=>{
    let ids=req.body.ids.split('/');
    ids.length=ids.length-1;
    Shop.deleteMany({_id:{$in:ids}})
        .then((data) => {
            res.send({ err:0, msg: 'delShops success' })
        }).catch((err) => {
            res.send({ err:-1, msg: 'delShops failed' });
        })
}
//按价格排序
let sortShops=(req,res)=>{
    let {sortValue}=req.body;
    console.log(req.body);
    Shop.find({}).sort({'shopPrice':sortValue})
    .then((data) => {
            res.send({ err: 0, msg: 'sortShops success',data:data})
        }).catch((err) => {
            res.send({ err: -1, msg: 'sortShops failed' });
        })
}
module.exports={
	getShop,
	getShopById,
	addShop,
	updateShop,
	getShopByKw,
	getShopByPage,
	delShop,
    delShops,
	pushShopState,
    sortShops
}