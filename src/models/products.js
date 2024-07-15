const { randomUUID } = require('crypto')
const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.UUID, default: () => randomUUID() },
    name: { required: true, type: String },
    description: { required: true, type: String },
    price: { required: true, type: Number },
    currency: { required: true, type: String, default: 'usd' },
    createdDate: { type: Date, default: Date.now },
})
const ProductModel = mongoose.model('Product', productSchema)
module.exports = ProductModel