const router = require("express").Router()
const { checkAvailablity, registerUser, loginUser, authenticateUser, getUser, editUser } = require("../controller/admin")
const auth = require("../middleware/auth")

router.get("/", checkAvailablity.respond.bind(checkAvailablity))
router.put("/", auth, editUser.respond.bind(editUser))
router.get("/:id", auth, getUser.respond.bind(getUser))
router.post("/register", registerUser.respond.bind(registerUser))
router.post("/login", loginUser.respond.bind(loginUser))
router.post("/authenticate", authenticateUser.respond.bind(authenticateUser))

module.exports = router
