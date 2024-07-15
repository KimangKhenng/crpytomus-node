const { randomUUID } = require('crypto')
const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: { required: true, type: String },
    description: { required: true, type: String },
    amount: { required: true, type: Number },
    currency: { required: true, type: String, default: 'USD' },
    createdDate: { type: Date, default: Date.now },
})
const ProductModel = mongoose.model('Product', productSchema)
module.exports = ProductModel