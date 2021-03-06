module.exports = {
    getItems(req, res) {
        let {searchTerm} = req.query; 
        searchTerm = searchTerm ? `${searchTerm}%` : ''
        let db = req.app.get('db')
        db.inventory.get_items({searchTerm}).then(dbRes => {
            res.status(200).send(dbRes)
        }).catch(err => res.status(200).send(err)) 
    }, 
    createItems(req, res) {
        let db = req.app.get('db')
        let {itemId, quantity, pantryId, itemName} = req.query
        if(itemId) {
            db.inventory.check_existing({pantryId, itemId}).then( dbRes => {
                if(dbRes.length) {
                    let {id, quantity: existingQuantity} = dbRes[0]
                    quantity = +quantity
                    quantity += existingQuantity
                    db.inventory.update_quantity_by_pantry_id({id, quantity: quantity, itemId: itemId}).then(dbRes2 => {
                    res.status(200).send(dbRes2)
                    })
                } else {
                    let returnObj = createItemInventoryLink(itemId, quantity, pantryId)
                    returnObj.status === 500 ? res.status(500).send(returnObj.err) : res.status(200).send(returnObj.dbRes)
                }
            })
        } 
        else {
            db.inventory.create_item({itemName}).then(dbRes => {
                let itemId = dbRes[0].id
                let returnObj = createItemInventoryLink(itemId, quantity, pantryId)
                returnObj.status === 500 ? res.status(500).send(returnObj.err) : res.status(200).send(returnObj.dbRes)
            }).catch(err => res.status(500).send(err))
        }
        async function createItemInventoryLink(itemId, quantity, pantryId) {
            try {
                let dbRes = await db.inventory.create_item_inventory_link({itemId, quantity, pantryId})
                return {
                    status: 200,
                    dbRes
                }; 
            } catch(err) {
                return {
                    status: 500,
                    err
                };
            }
        }
    },
    getInventory(req, res) {
        let db = req.app.get('db')
        let {pantryId} = req.params 
        db.inventory.get_inventory({id: pantryId}).then(dbRes => {
            db.family.get_family_by_pantry_id({id: pantryId}).then(dbRes2 => {
                let formatted = {
                    inventory: dbRes,
                    families: dbRes2
                }
                res.status(200).send(formatted)
            }).catch(err => {
                res.status(500).send(err)
            })
        }).catch(err => {
            res.status(500).send(err)
        })

    },
    updatePantryInventory(req, res) {
        let db = req.app.get('db')
        let {itemInventoryLinks, familyId} = req.body
        let {pantryId} = req.params
        let promises = []
        itemInventoryLinks.forEach( obj => {
            promises.push(db.inventory.update_quantity_by_pantry_id({id: obj.itemInventoryId, quantity: obj.newQuantity, itemId: obj.itemId}))
        })
        promises.push(db.family.update_family_status({familyId}))
        Promise.all(promises).then( values => {
            res.sendStatus(200)
        }).catch(reason => {
            res.status(500).send('One or more of your updates didnt go through')
        })
    }
}