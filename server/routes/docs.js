const router = require("express").Router()
const { getRestDocs } = require("../controller/docs")

router.get("/rest", getRestDocs)

module.exports = router
