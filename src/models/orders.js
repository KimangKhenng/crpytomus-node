const { randomUUID } = require('crypto')
const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    products: [{ required: true, type: mongoose.Types.ObjectId, ref: 'Product' }],
    totalAmount: { required: true, type: Number },
    createdDate: { type: Date, default: Date.now },
})
const OrderModel = mongoose.model('Order', orderSchema)
module.exports = OrderModel