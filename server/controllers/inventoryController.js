module.exports = {
    getItems(req, res) {

    }, 
    createItems(req, res) {

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