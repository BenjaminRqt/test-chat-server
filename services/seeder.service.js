const faker = require('faker')
const User = require('../models/user.model')
const config = require('../config/index')

module.exports = {
    seedData () {
        User.countDocuments((err, count) => {
            if (count > 0) {
                return;
            }

            this.createUsers()
        })
    },
    createUsers () {
        let users = [];

        Array.from(Array(config.numberOfUsers)).forEach(() => {
            users.push({
                username: faker.lorem.sentence(1),
                password: 'test'
            })
        })

        User.insertMany(users)
    },
}
