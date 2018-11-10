const bcrypt = require('bcrypt')
module.exports = {
    loginCoordinator: (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        db.auth.get_coordinators().then(coordinators => {
            let coord = coordinators.find(async c => {
                let res = await bcrypt.compare(password, c.password)
                return res && username === c.username
            })
            if(coord.username) {
                req.session.user = coord
                res.status(200).send(req.session.user)
            } else {
                res.status(404).send("User and Password combination not found")
            }
        })

    },
    getCurrentCoord: (req, res) => {
        res.status(200).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send({})
    } 
}