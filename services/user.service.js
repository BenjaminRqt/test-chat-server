const User = require('../models/user.model')

module.exports = {
    getAll (req, res) {
        User.find({}, 'id', (err, users) => {
            this._handleResponse(err, users, res)
        })
    },
    getByUsername (req, res) {
        User.findOne({_id: req.params.username})
            .exec((err, user) => {
                this._handleResponse(err, user, res)
            })
    },
    create(req, res) {
        User.create({
            username: req.body.username,
            password: req.body.password
        }).then((data) => {
            res.send(data)
        })
    },
    _handleResponse (err, data, res) {
        if (err) {
            res.status(400).end()
        } else {
            res.send(data)
        }
    }
}
