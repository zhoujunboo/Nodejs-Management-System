const User  = require('../db/model/UserModel.js');
const tools = require('../tools/tools.js')

//获得User信息
let getUser=(req,res)=>{
    User.find()
    .then((data)=>{
        res.send({ err: 0, msg: 'getUser success', data: data })
    }).catch((err)=>{
        res.send({ err: -1, msg: 'getUser failed' })
    })
}
//通过id获取User信息
let getUserById= (req, res) => {
    let id = req.body.id;
    console.log(id);
    User.find({ _id: id })
        .then((data) => {
            res.send({ err: 0, msg: 'getUserById success', data: data })
        }).catch((err) => {
            res.send({ err: -1, msg: 'getUserById failed' })
        })
}
//添加User信息
let addUser=(req,res)=>{
    let {user,pass,phone,adress,email,state}=req.body
    User.insertMany({user,pass,phone,adress,email,state})
    .then((data)=>{
        res.send({err:0,msg:'添加用户信息成功！'})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'添加用户信息失败！'})
    })
}
//通过id修改User
let  updateUser=(req, res) => {
    let { id, user,pass,phone,adress,email,state} = req.body;
    User.updateMany({ _id: id }, {user,pass,phone,adress,email,state})
        .then((data) => {
            res.send({ err: 0, msg: 'updateUser success' })
        }).catch((err) => {
            res.send({ err: -1, msg: 'updateUser failed' })
        })
}
//模糊查询User信息
let getUserByKw=(req, res) => {
    let keyword = req.body.keyword;
    let reg = new RegExp(keyword);
    User.find({
            $or: [
                { user: { $regex: reg } }
            ]
        })
        .then((data) => {
            res.send({ err: 0, msg: 'getUserByKw success', data: data })
        }).catch((err) => {
            res.send({ err: -1, msg:'getUserByKw failed'})
        })
}
//分页查询User信息
let getUserByPage=(req, res) => {
    let page = Number(req.body.page) || 1;
    let pageSize = Number(req.body.pageSize) || 2;
    let total = 0;
    User.find()
        .then((data) => {
            total = data.length;
            return User.find().skip(pageSize * (page - 1)).limit(pageSize)
        })
        .then((data) => {
            let obj = {
                list: data, //某一页的具体信息
                total: total, //总的数据条数
                pageSize: pageSize, //每页显示条数
                nowPage: page //当前页数
            }
            res.send({ err: 0, msg: 'getUserByPage success', data: obj })
        }).catch((err) => {
            res.send({ err: -1, msg: 'getUserByPage failed' })
        })
}
//通过id删除User信息
let delUser=(req, res) => {
    let id = req.body.id;
    User.deleteOne({ _id: id })
        .then((data) => {
            res.send({ err: 0, msg: 'delUser success' })
        }).catch((err) => {
            res.send({ err: -1, msg: 'delUser failed' });
        })
}
//批量删除
let delUsers=(req,res)=>{
    let ids=req.body.ids.split('/');
    ids.length=ids.length-1;
    User.deleteMany({_id:{$in:ids}})
        .then((data) => {
            res.send({ err: 0, msg: 'delUsers success' })
        }).catch((err) => {
            res.send({ err: -1, msg: 'delUsers failed' });
        })
}
//修改User发布状态
let pushUserState=(req, res) => {
    let { id, state } = req.body
    User.updateOne({ _id: id }, { state })
        .then((data) => {
            res.send({ err: 0, msg: 'pushUserState success' })
        })
        .catch((err) => {
            res.send({ err: -1, msg: 'pushUserState failed' })
        })
}
module.exports={
    getUser,
    getUserById,
    addUser,
    updateUser,
    getUserByKw,
    getUserByPage,
    delUser,
    delUsers,
    pushUserState
}