module.exports = {
    loginUser: (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        db.auth.get_coordinators()
    }
}