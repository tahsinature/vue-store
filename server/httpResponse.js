module.exports.BaseHTTPResponse = class {
  constructor({ statusCode = 200, data = null, msg = "" }) {
    this.statusCode = statusCode
    this.data = data
    this.msg = msg
    this.headers = { "Content-Type": "application/json" }
  }

  setHeaders(headers) {
    this.headers = {
      ...this.headers,
      ...headers,
    }
  }

  send(res) {
    res.writeHead(this.statusCode, this.headers)
    res.end(JSON.stringify({ msg: this.msg, data: this.data }))
  }
}

module.exports.NotFoundResponse = class extends this.BaseHTTPResponse {
  constructor(msg = "Not Found") {
    super({ statusCode: 404, msg })
  }
}

module.exports.BadRequestResponse = class extends this.BaseHTTPResponse {
  constructor(msg = "Bad Request") {
    super({ statusCode: 400, msg })
  }
}

module.exports.UnathorizedResponse = class extends this.BaseHTTPResponse {
  constructor(msg = "Unauthorized") {
    super({ statusCode: 401, msg })
  }
}

module.exports.SuccessResponse = class extends this.BaseHTTPResponse {
  constructor(data, msg = "Success") {
    super({ statusCode: 200, data, msg })
  }
}

module.exports.InternalErrorResponse = class extends this.BaseHTTPResponse {
  constructor(msg = "Something went wrong") {
    super({ statusCode: 500, msg })
  }
}

module.exports.ConflictErrorResponse = class extends this.BaseHTTPResponse {
  constructor(msg = "Conflict") {
    super({ statusCode: 409, msg })
  }
}
