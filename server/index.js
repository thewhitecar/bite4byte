const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const {SERVER_PORT} = process.env

const app = express()

app.listen(PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})