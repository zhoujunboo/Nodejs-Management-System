const express = require('express');
const router = express.Router();

const Banner = require('../db/model/bannerModel.js')
router.get('/getBanner', (req, res) => {
    Banner.find()
        .then((data) => {
            res.send({ err: 0, msg: 'getBanner success', data: data })
        }).catch((err) => {
            res.send({ err: -1, msg: 'getBanner failed' })
        })
})
module.exports = router;