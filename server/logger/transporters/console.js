const winston = require("winston")
const Transport = require("winston-transport")
const colors = require("colors")

const colorFnMap = {
  success: colors.cyan,
  info: colors.white,
  warn: colors.yellow,
  error: colors.red,
  default: colors.gray,
}

class ConsoleTransport extends Transport {
  constructor(channelName, printData) {
    super({ format: winston.format.json() })
    this.channelName = channelName
    this.printData = printData
  }

  log(info, cb) {
    const colorFn = colorFnMap[info.level] || colorFnMap.default
    const msg = `${colors.bold.italic.blue(this.channelName)} ${colorFn(info.message)}`

    if (this.printData && info.data) console.log(msg, info.data)
    else console.log(msg)

    cb()
  }
}

module.exports = ConsoleTransport
