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
        // TODO: If time come back and make it that it checks if there is a link already to item table see if there is a link existing in the table that links item_inventory_link
        let db = req.app.get('db')
        let {itemId, quantity, pantryId, itemName} = req.query
        if(itemId) {
            let returnObj = createItemInventoryLink(itemId, quantity, pantryId)
            returnObj.status === 500 ? res.status(500).send(returnObj.err) : res.status(200).send(returnObj.dbRes)
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
    updateInventoryQuantity(req, res) {

    }
}