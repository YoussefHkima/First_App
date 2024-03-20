const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    description: { type: String },
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number, required: false, default: 0 },
    image: { type: String },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },

}, {
    timestamps: true
})
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;