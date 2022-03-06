const config = require("./config");
const db = require("./db");

const express = require("express"),
  app = express(),
  multer = require("multer"),
  mongoose = require("mongoose"),
  indexRoute = require("./routes");

app.use(require("morgan")("tiny"));
app.use(require("cors")());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now().toLocaleString()}-${file.originalname}`);
  },
});

// set public
app.use(express.static("public"));
app.use(multer({ storage }).array("images"));
app.use("/", indexRoute.home);
app.use("/auth", indexRoute.auth);
app.use("/products", indexRoute.product);
app.use("/cart", indexRoute.cart);
app.use("/media", indexRoute.media);
app.use("/reviews", indexRoute.review);
app.use("/likes", indexRoute.like);
app.use("/chats", indexRoute.chat);
app.use("/contacts", indexRoute.contact);
app.use("/notifications", indexRoute.notification);
app.use((err, req, res, next) => {
  // logger.error(err);
  res.status(err.statusCode || err.status || 500).json(err);
});
// app.use("*", (req, res) => {
//   res.sendFile("index.html", { root: "./public" });
// });

const exec = async () => {
  await db.connect();

  const server = app.listen(config.appPort, async () => {
    const io = require("./socket").init(server);
    io.on("connection", socket => {
      console.log("Client Connected");
      socket.on("onReviewMade", (productId, review) => {
        io.emit("onReviewMade", productId, review);
      });
    });
    console.log(`Listening on port: ${config.appPort}`);
  });
};

exec();
