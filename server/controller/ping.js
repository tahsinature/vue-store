const BaseController = require("./BaseController")
const { SuccessResponse } = require("../httpResponse")

class HealthCheckController extends BaseController {
  async _implementation() {
    const data = {
      success: true,
    }

    return new SuccessResponse(data, "Health Check Successful")
  }
}

module.exports = {
  healthCheck: new HealthCheckController(),
}
