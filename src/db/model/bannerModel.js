const mongoose = require('mongoose')
const schema = mongoose.Schema

let BannerSchema = new schema({
    imgPath: { type: String, required: true },
    url: { type: String, required: true },
    name: { type: String, required: true },
    push: { type: Boolean, default: false }
})

let model = mongoose.model('Banner', BannerSchema);

module.exports = model