const mongoose = require("mongoose")
const config = require("./config")
const logger = require("./logger")

class DB {
  async connect() {
    await mongoose
      .connect(config.dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => logger.db.info(`Connected to DB: ${config.dbURI}`))
      .catch(() => {
        throw new Error(`DB Connection Failed: ${config.dbURI}`)
      })
  }

  async disconnect() {
    await mongoose.disconnect()
    logger.db.info("DB Disconnected")
  }

  async dropDB() {
    await mongoose.connection.db.dropDatabase()
    logger.db.info("DB Deleted")
  }

  async clearModels(modelNames = mongoose.modelNames()) {
    for (const modelName of modelNames) {
      await mongoose.model(modelName).deleteMany({})
    }
    logger.db.info(`DB Models Cleared: ${modelNames.join(", ")}`)
  }
}

const db = new DB()

module.exports = db
