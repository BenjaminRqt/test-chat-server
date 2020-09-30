import express from "express"
const router = express.Router()
import userService from "../services/user.service"
import auth from '../middleware/auth'

router.get("/users", auth, userService.getAll.bind(userService))
router.get("/users/:username", userService.getByUsername.bind(userService))
router.post("/users", userService.create.bind(userService))
router.post("/login", userService.login.bind(userService))

export default router
