const config = require("../config")

module.exports.getRestDocs = async (req, res) => {
  res.json(require(config.app.docs.rest))
}
