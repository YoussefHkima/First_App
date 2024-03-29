const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: { type: String, require: true, unique: true },
    name: { type: String },
    password: { type: String }
}, {
    timestamps: true
})
module.exports = mongoose.model('User', UserSchema)