const mongoose = require('mongoose')
const schema = mongoose.Schema

let UserSchema = new schema({
    user: { type: String, required: true },
    pass: { type: String, required: true },
    phone:{ type: String, require: true },
    email:{ type: String, require: true },
    adress:{ type:String, require: true },
    state: { type:Boolean, require: false }
})

let model = mongoose.model('user', UserSchema);

module.exports = model