import User from '../models/user.model'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

module.exports = {
    login (req: any, res: any) {
        User.findOne({ username: req.body.username }).then(
            (user: User) => {
                if (!user) {
                    return res.status(401).json({
                        error: new Error('User not found!')
                    });
                }
                bcrypt.compare(req.body.password, user.password).then(
                    (valid: boolean) => {
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
                            token
                        });
                    }
                ).catch(
                    (error: Error) => {
                        res.status(500).json({
                            error
                        });
                    }
                );
            }
        ).catch(
            (error: Error) => {
                res.status(500).json({
                    error
                });
            }
        );
    },
    getAll (req: any, res: any) {
        User.find({}, ["username", "password"], (err: Error, users: User) => {
            this._handleResponse(err, users, res)
        })
    },
    getByUsername (req: any, res: any) {
        User.findOne({_id: req.params.username})
            .exec((err: Error, user: User) => {
                this._handleResponse(err, user, res)
            })
    },
    create(req: any, res: any) {
        User.create({
            username: req.body.username,
            password: req.body.password
        }).then((data: any) => {
            res.send(data)
        })
    },
    _handleResponse (err: any, data: any, res: any) {
        if (err) {
            res.status(400).end()
        } else {
            res.send(data)
        }
    }
}
