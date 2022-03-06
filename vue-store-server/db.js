const mongoose = require("mongoose");
const config = require("./config");

class DB {
  async connect() {
    await mongoose
      .connect(config.dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log(`Connected to DB: ${config.dbURI}`))
      .catch(() => {
        console.log(`DB Connection Failed: ${config.dbURI}`);
      });
  }

  async disconnect() {
    await mongoose.disconnect();
    console.log("DB Disconnected");
  }

  async dropDB() {
    await mongoose.connection.db.dropDatabase();
    console.log("DB Deleted");
  }
}

const db = new DB();

module.exports = db;
