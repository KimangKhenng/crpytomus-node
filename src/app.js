require('dotenv').config()
const express = require('express')
const dbConnect = require('./db')
const port = process.env.PORT
const app = express()

dbConnect().catch((err) => { console.log(err) })

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})