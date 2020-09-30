const faker = require('faker')
const User = require('../models/user.model')
const config = require('../../config')

module.exports = {
    seedData () {
        User.countDocuments((err: Error, count: number) => {
            if (count > 0) {
                return;
            }

            this.createUsers()
        })
    },
    createUsers () {
        const users: Array<User> = [];

        Array.from(Array(config.numberOfUsers)).forEach(() => {
            users.push({
                username: faker.lorem.sentence(1),
                password: 'test'
            })
        })

        User.insertMany(users)
    },
}
