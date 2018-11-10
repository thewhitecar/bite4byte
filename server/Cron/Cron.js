module.exports = {
    setFamilyStatusToFalse(db) {
        db.family.set_status_false()
    }
}