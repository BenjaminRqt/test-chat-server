const User = require('../models/user.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    login (req, res) {
        User.findOne({ username: req.body.username }).then(
            (user) => {
                if (!user) {
                    return res.status(401).json({
                        error: new Error('User not found!')
                    });
                }
                bcrypt.compare(req.body.password, user.password).then(
                    (valid) => {
                        if (!valid) {
                            return res.status(401).json({
                                error: new Error('Incorrect password!')
                            });
                        }
                        const token = jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' });

                        res.status(200).json({
                            userId: user._id,
                            token: token
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(500).json({
                            error: error
                        });
                    }
                );
            }
        ).catch(
            (error) => {
                res.status(500).json({
                    error: error
                });
            }
        );
    },
    getAll (req, res) {
        User.find({}, ["username", "password"], (err, users) => {
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
        if(this._exist(req.body.username)) {
            res.status(500)
            res.send({
                'message': 'User already exist'
            })
        }

        User.create({
            username: req.body.username,
            password: req.body.password
        }).then((data) => {
            this._handleResponse(data)
        }).catch((reason => {
            this._handleResponse(reason)
        }))
    },
    _exist (username) {
        console.log(User.findOne({username: username}).exec());

        return User.findOne({username: username}).exec() !== null
    },
    _handleResponse (err, data, res) {
        if (err) {
            res.status(400).end()
        } else {
            res.send(data)
        }
    }
}
