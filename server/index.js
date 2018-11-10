const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const ic = require('./controllers/inventoryController.js')
require('dotenv').config()
const {SERVER_PORT, CONNECTION_STRING} = process.env


const app = express()
app.use(bodyParser.json())

massive(CONNECTION_STRING).then( dbInstance => {
    app.set('db', dbInstance)
})

//Inventory routes
app.get('/api/inventory', ic.getItems)
app.post('/api/inventory', ic.createItems)

//pantry specific 
app.get('/api/inventory/:pantryId', ic.getInventory)
app.put('/api/inventory/:pantryId', ic.updateInventoryQuantity)

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})