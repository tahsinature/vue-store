const Transport = require("winston-transport")

class VoidTransport extends Transport {
  log(info, cb) {
    cb()
  }
}

module.exports = VoidTransport
