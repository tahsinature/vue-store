const Joi = require("joi")
const { BaseHTTPResponse, BadRequestResponse, InternalErrorResponse } = require("../httpResponse")
const httpResponse = require("../httpResponse")
// import { BadRequestResponse } from "../httpResponse"

/**
 * Abstract base class for all controllers.
 */
class BaseController {
  constructor() {
    this.Joi = Joi
    this.httpResponses = httpResponse

    this.requestSchema = {
      body: Joi.object({}).required(),
      queryParams: Joi.object({}).required(),
      pathParams: Joi.object({}).unknown().required(),
    }
  }

  /**
   * @returns {Promise<BaseHTTPResponse>}
   */
  async _implementation() {
    throw new Error("_implementation() must be implemented by the subclass.")
  }

  async _validateRequest(req) {
    try {
      const errors = []

      if (this.requestSchema.body) {
        const { error } = this.requestSchema.body.validate(req.body, { abortEarly: false })
        if (error) errors.push(error.details.map(d => d.message).join(", "))
      }
      if (this.requestSchema.queryParams) {
        const { error } = this.requestSchema.queryParams.validate(req.query, { abortEarly: false })
        if (error) errors.push(error.details.map(d => d.message).join(", "))
      }
      if (this.requestSchema.pathParams) {
        const { error } = this.requestSchema.pathParams.validate(req.params, { abortEarly: false })
        if (error) errors.push(error.details.map(d => d.message).join(", "))
      }

      if (errors.length) throw new Error(errors.join(", "))
    } catch (error) {
      throw new BadRequestResponse(error.message)
    }
  }

  async respond(req, res, next) {
    try {
      await this._validateRequest(req)
      const responder = await this._implementation(req, res)
      if (!(responder instanceof BaseHTTPResponse)) throw new Error("_implementation() must return a BaseHTTPResponse.")

      responder.send(res)
    } catch (err) {
      console.log(err)
      if (err instanceof BaseHTTPResponse) {
        err.setHeaders(res.headers)
        err.send(res)
      } else new InternalErrorResponse().send(res)
    }
  }
}

module.exports = BaseController
