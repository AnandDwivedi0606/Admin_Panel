const express = require("express")
// const { home, register } = require("../controllers/auth-controller")
const authcontrollers = require("../controllers/auth-controller")
const { signUpSchema, loginSchema } = require("../validators/auth-validator")
const validate = require("../middlewares/validate-middleware")
const authMiddleware = require("../middlewares/auth-middleware")

const router = express.Router()

router.route('/').get(authcontrollers.home)

router.route("/register").post(validate(signUpSchema), authcontrollers.register)
router.route("/login").post(validate(loginSchema), authcontrollers.login)
router.route("/user").get(authMiddleware, authcontrollers.user)

module.exports = router