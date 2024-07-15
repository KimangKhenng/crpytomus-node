require('dotenv').config()
const express = require('express')
const path = require("path")
const parser = require('body-parser')
const crypto = require('crypto')
const dbConnect = require('./db')
const ProductModel = require('./models/products')
const OrderModel = require('./models/orders')
const axios = require('axios')
const port = process.env.PORT
const app = express()

dbConnect().catch((err) => { console.log(err) })

app.use(parser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf
    }
}))

app.use(express.static(path.join(__dirname, 'template')));

app.get('/products', async (req, res) => {
    const products = await ProductModel.find().sort({ 'createdDate': 'desc' })
    return res.json(products)
})

app.post('/checkout', async (req, res) => {
    const { amount, currency, productId } = req.body
    // New order
    const order = new OrderModel({
        products: [productId],
        totalAmount: amount
    })
    await order.save()
    const data = {
        amount: amount.toString(),
        currency: currency,
        order_id: order._id.toString(),
        url_callback: "https://1bd0-202-56-3-43.ngrok-free.app/callback"
    }
    const sign = crypto
        .createHash('md5')
        .update(Buffer.from(JSON.stringify(data)).toString('base64') + process.env.CRPYTOMUS_API_KEY)
        .digest('hex')
    const response = await axios.post('https://api.cryptomus.com/v1/payment',
        data,
        {
            headers: {
                merchant: process.env.CRYPTOMUS_MERCHANT_ID,
                sign: sign
            }
        }
    )
    return res.json(response.data)
})

app.post('/callback', async (req, res) => {
    const sign = req.body
    if (!sign) {
        return res.status(400).send("Invalid payload")
    }
    const data = JSON.parse(req.rawBody)
    delete data.sign

    const hash = crypto
        .createHash('md5')
        .update(Buffer.from(JSON.stringify(data)).toString('base64') + process.env.CRPYTOMUS_API_KEY)
        .digest('hex')
    if (hash !== sign) {
        return res.status(400).send("Invalid Signature")
    }
    console.log(req.body)
    return res.sendStatus(200)
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'template/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})