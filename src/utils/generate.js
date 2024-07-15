require('dotenv').config()

const dbConnect = require('../db')
const { faker } = require('@faker-js/faker')
const ProductModel = require('../models/products')
dbConnect().catch((err) => { console.log(err) })

const numberProduct = 10
// Generate fake data
// faker.js

async function generate() {
    for (let i = 0; i < numberProduct; i++) {
        const product = new ProductModel({
            name: faker.commerce.product(),
            amount: faker.number.int({ max: 5 }),
            description: faker.commerce.productDescription(),
        })
        await product.save()
        console.log(`Product: ${product.name} generated!`)
    }
}
generate()