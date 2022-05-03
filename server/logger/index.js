const winston = require("winston")
const config = require("../config.js")

const ConsoleTransport = require("./transporters/console.js")
const VoidTransport = require("./transporters/void.js")

const defaultOption = {
  printData: false,
  shouldLog: !config.app.isTest,
}

class Log {
  constructor(loggerName, option = defaultOption) {
    this._option = {
      ...defaultOption,
      ...option,
    }

    this._logger = winston.createLogger({
      format: winston.format.json(),
      defaultMeta: {
        meta: {
          service: loggerName,
        },
      },
    })

    if (this._option.shouldLog) {
      this._logger.add(new ConsoleTransport(loggerName, this._option.printData))
      /**
       * Other transports can be added here
       */
    } else this._logger.add(new VoidTransport())
  }

  /**
   * @param {string} msg message to log
   * @param {any} data data to log
   */
  info(msg, data) {
    this._logger.info(msg, data)
  }

  /**
   * @param {Error} err error object
   * @param {any} data data to log
   */
  error(err, data) {
    const msg = err.message || err
    this._logger.error(msg, data)
  }
}

const logger = {
  app: new Log("app"),
  socket: new Log("socket"),
  db: new Log("db"),
  scheduler: new Log("scheduler"),
  api: new Log("api"),
}

module.exports = logger
