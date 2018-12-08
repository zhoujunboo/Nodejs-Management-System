const express = require('express');
const router = express.Router();
const tools = require('../tools/tools.js');

const BannerCtr=require('../controller/banner.controller.js');
const ShopCtr=require('../controller/shop.controller.js');
const UserCtr=require('../controller/user.controller.js');

//轮播图接口
router.get('/banner/getBanner', tools.checkTokenMiddl,BannerCtr.getBanner);
router.post('/banner/getBannerById',tools.checkTokenMiddl,BannerCtr.getBannerById);
router.post('/banner/getBannerByKw',tools.checkTokenMiddl,BannerCtr.getBannerByKw)
router.post('/banner/getBannerByPage',tools.checkTokenMiddl,BannerCtr.getBannerByPage)
router.post('/banner/delBanner',tools.checkTokenMiddl,BannerCtr.delBanner)
router.post('/banner/delBanners',tools.checkTokenMiddl,BannerCtr.delBanners)
router.post('/banner/addBanner', tools.checkTokenMiddl,BannerCtr.addBanner)
router.post('/banner/updateBanner',tools.checkTokenMiddl,BannerCtr.updateBanner)
router.post('/banner/pushBanner', tools.checkTokenMiddl,BannerCtr.pushBanner)

//产品信息接口
router.get('/shop/getShop',tools.checkTokenMiddl,ShopCtr.getShop)
router.post('/shop/getShopById',tools.checkTokenMiddl,ShopCtr.getShopById)
router.post('/shop/addShop',tools.checkTokenMiddl,ShopCtr.addShop)
router.post('/shop/updateShop',tools.checkTokenMiddl,ShopCtr.updateShop)
router.post('/shop/getShopByKw',tools.checkTokenMiddl,ShopCtr.getShopByKw)
router.post('/shop/getShopByPage',tools.checkTokenMiddl,ShopCtr.getShopByPage)
router.post('/shop/delShop',tools.checkTokenMiddl,ShopCtr.delShop)
router.post('/shop/delShops',tools.checkTokenMiddl,ShopCtr.delShops)
router.post('/shop/pushShopState',tools.checkTokenMiddl,ShopCtr.pushShopState)
router.post('/shop/sortShops',/*tools.checkTokenMiddl,*/ShopCtr.sortShops)

//用户信息接口 
router.get('/user/getUser',tools.checkTokenMiddl,UserCtr.getUser)
router.post('/user/getUserById',tools.checkTokenMiddl,UserCtr.getUserById)
router.post('/user/addUser',tools.checkTokenMiddl,UserCtr.addUser)
router.post('/user/updateUser',tools.checkTokenMiddl,UserCtr.updateUser)
router.post('/user/getUserByKw',tools.checkTokenMiddl,UserCtr.getUserByKw)
router.post('/user/getUserByPage',tools.checkTokenMiddl,UserCtr.getUserByPage)
router.post('/user/delUser',tools.checkTokenMiddl,UserCtr.delUser)
router.post('/user/delUsers',tools.checkTokenMiddl,UserCtr.delUsers)
router.post('/user/pushUserState',tools.checkTokenMiddl,UserCtr.pushUserState)

module.exports = router;