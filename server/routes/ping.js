const router = require("express").Router()
const { healthCheck } = require("../controller/ping")

router.get("/", healthCheck.respond.bind(healthCheck))

module.exports = router
