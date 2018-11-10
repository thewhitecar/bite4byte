const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const ic = require('./controllers/inventoryController.js')
const ac = require('./controllers/authController.js')
require('dotenv').config()
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()
app.use(bodyParser.json())
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: SESSION_SECRET
}))

massive(CONNECTION_STRING).then( dbInstance => {
    app.set('db', dbInstance)
})

//Login endpoints
app.post('/api/login', ac.loginCoordinator)

//Inventory routes
app.get('/api/inventory', ic.getItems)
app.post('/api/inventory', ic.createItems)

//pantry specific 
app.get('/api/inventory/:pantryId', ic.getInventory)
app.put('/api/inventory/:pantryId', ic.updatePantryInventory)

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})