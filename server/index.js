const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const ic = require('./controllers/inventoryController.js')
const ac = require('./controllers/authController.js')
const CronJob = require('cron').CronJob
const cronJobs = require('./Cron/Cron')
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
    console.log('db connected')
    familyStatusFalse.start()
})

//Cron jobs 
const familyStatusFalse = new CronJob('0 30 1 * * 1', () => {
    const db = app.get('db')
    if(db) cronJobs.setFamilyStatusToFalse(db)
})


//Login endpoints
app.post('/api/login', ac.loginCoordinator)
app.get('/api/getCoordinator', ac.getCurrentCoord)

//Inventory routes
app.get('/api/inventory', ic.getItems)
app.post('/api/inventory', ic.createItems)

//pantry specific 
app.get('/api/inventory/:pantryId', ic.getInventory)
app.put('/api/inventory/:pantryId', ic.updatePantryInventory)

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})