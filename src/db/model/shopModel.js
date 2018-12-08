const mongoose = require('mongoose')
const schema = mongoose.Schema

let ShopSchema = new schema({
    shopImg:{ type: String, required: true },
    shopName:{ type: String, required: true },
    shopDescribe:{ type: String, required: true },
    shopPrice: { type: String, required: true },
    shopState: { type: Boolean, required: true }
})

let model = mongoose.model('shop', ShopSchema);

module.exports = model