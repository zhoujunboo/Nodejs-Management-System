const mongoose = require('mongoose')
const schema = mongoose.Schema

let AdminSchema = new schema({
    name: { type: String, required: true },
    pass: { type: String, required: true },
})

let model = mongoose.model('adusers', AdminSchema);
module.exports = model