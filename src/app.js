require('dotenv').config()
const express = require('express')
const path = require("path")
const parser = require('body-parser')
const dbConnect = require('./db')
const ProductModel = require('./models/products')
const port = process.env.PORT
const app = express()

dbConnect().catch((err) => { console.log(err) })

app.use(parser.json())

app.use(express.static(path.join(__dirname, 'template')));

app.get('/products', async (req, res) => {
    const products = await ProductModel.find().sort({ 'createdDate': 'desc' })
    return res.json(products)
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'template/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})