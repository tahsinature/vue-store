const config = require("../config")

const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
  </head>
  <body>
    <rapi-doc spec-url="/api/docs/rest?format=json"> </rapi-doc>
  </body>
</html>
`

const formatMap = {
  json: require(config.app.docs.rest),
  html,
}

module.exports.getRestDocs = async (req, res) => {
  const { format } = req.query

  const dataToSend = formatMap[format]

  if (dataToSend) res.send(dataToSend)
  else res.status(400).send({ error: "Invalid format" })
}
