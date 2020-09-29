const User = require('../models/user.model')

module.exports = {
    getAll (req, res) {
        User.find({}, 'id', (err, boards) => {
            this._handleResponse(err, boards, res)
        })
    },
    getById (req, res) {
        User.findOne({_id: req.params.userId})
            .exec((err, board) => {
                this._handleResponse(err, board, res)
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
