const express = require("express")
const { getAllUsers, getUserById, updateUserById, deleteUserById, getAllContact, deleteContactById } = require("../controllers/admin-controller")
const authMiddleware = require("../middlewares/auth-middleware")
const adminMiddleware = require("../middlewares/admin-middleware")

const router = express.Router()

router.route("/user").get(authMiddleware, adminMiddleware, getAllUsers)

router.route("/user/:id").get(authMiddleware, adminMiddleware, getUserById)

router.route("/user/update/:id").put(authMiddleware, adminMiddleware, updateUserById)

router.route("/user/delete/:id").delete(authMiddleware, adminMiddleware, deleteUserById)

router.route("/contact").get(authMiddleware, adminMiddleware, getAllContact)

router.route("/contact/delete/:id").delete(authMiddleware, adminMiddleware, deleteContactById)

module.exports = router
