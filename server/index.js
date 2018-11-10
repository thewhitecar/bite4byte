const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const {PORT} = process.env

const app = express()

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})