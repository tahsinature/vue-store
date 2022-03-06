const apiRoutes = require("express").Router();
const staticRoutes = require("express").Router();

staticRoutes.use("/", require("./home"));

apiRoutes.use("/auth", require("./auth"));
apiRoutes.use("/products", require("./product"));
apiRoutes.use("/cart", require("./cart"));
apiRoutes.use("/media", require("./media"));
apiRoutes.use("/reviews", require("./review"));
apiRoutes.use("/likes", require("./like"));
apiRoutes.use("/chats", require("./chat"));
apiRoutes.use("/contacts", require("./contact"));
apiRoutes.use("/notifications", require("./notification"));

module.exports = {
  apiRoutes,
  staticRoutes,
};
