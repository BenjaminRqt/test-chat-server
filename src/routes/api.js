const express = require("express")
const router = express.Router()
const userService = require("../services/user.service")
const auth = require('../middleware/auth');

router.get("/user", auth, userService.getAll.bind(userService))
router.get("/users/:username", userService.getByUsername.bind(userService))
router.post("/user", userService.create.bind(userService))
router.post("/login", userService.login.bind(userService))

module.exports = router
