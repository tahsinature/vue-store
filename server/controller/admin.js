const Joi = require("joi")
const errors = require("throw.js")
const bcrypt = require("bcryptjs")
const _ = require("lodash")
const jwt = require("jsonwebtoken")
const db = require("../models/index")
const utility = require("../utility")
const BaseController = require("./BaseController")

const regUserSchema = Joi.object().keys({
  fullName: Joi.string().required(),
  userName: Joi.string().min(3).required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  contactNo: Joi.string().required(),
  profilePhoto: Joi.object().required(),
  location: Joi.string().required(),
  address: Joi.string().max(100).required(),
  gender: Joi.string().required(),
  bio: Joi.string().max(255).required(),
})

const editUserSchema = Joi.object().keys({
  fullName: Joi.string().required(),
  contactNo: Joi.string().required(),
  profilePhoto: Joi.object().required(),
  location: Joi.string().required(),
  address: Joi.string().max(100).required(),
  gender: Joi.string().required(),
  bio: Joi.string().max(255).required(),
})

const loginUserSchema = Joi.object().keys({
  userName: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
})

class CheckAvailablity extends BaseController {
  constructor() {
    super()
    super.requestSchema = {
      queryParams: this.Joi.alternatives().try(
        this.Joi.object().keys({
          email: this.Joi.string().email().required(),
        }),
        this.Joi.object().keys({
          userName: this.Joi.string().required(),
        })
      ),
    }
  }
  async _implementation(req, res) {
    const factor = Object.keys(req.query)[0]
    const value = req.query[factor]

    const result = await db.User.findOne({ [factor]: value })

    if (result) throw new this.httpResponses.ConflictErrorResponse(`User already register with this ${factor}`)
    return new this.httpResponses.SuccessResponse()
  }
}

class RegisterUser extends BaseController {
  async _implementation(req, res) {
    const { error } = Joi.validate(req.body, regUserSchema)
    if (error) return res.status(400).send(error.message)
    let user = await db.User.findOne({
      $or: [{ userName: req.body.userName }, { email: req.body.email }],
    })

    if (user) {
      return next(
        new errors.Conflict({
          errorMessage: "User already registerd with this e-Mail or, username.",
        })
      )
    }

    const newUserData = _.omit(req.body, "password")
    newUserData.password = utility.genHashForPass(req.body.password)
    user = new db.User(newUserData)
    user.save()
    res.status(201).json({ message: "Successfully Registered." })
  }
}

class LoginUser extends BaseController {
  async _implementation(req, res, next) {
    const credential = _.pick(req.body, ["userName", "password"])
    const { error } = Joi.validate(credential, loginUserSchema)
    if (error) {
      return next(new errors.BadRequest({ errorMessage: "Invalid Input" }))
    }
    const user = await db.User.findOne({ userName: req.body.userName })
    if (!user)
      return next(
        new errors.BadRequest({
          errorMessage: "No user matches with this credentials.",
        })
      )
    const isValidPassword = await utility.compare(req.body.password, user.password)
    if (!isValidPassword) {
      return next(new errors.Unauthorized({ errorMessage: "Invalid credentials." }))
    }
    const token = user.generateToken()
    res.status(200).send({ "x-auth-token": token, user: user.toAdminJSON() })
  }
}

class EditUser extends BaseController {
  async _implementation(req, res) {
    const { error } = Joi.validate(req.body, editUserSchema)
    if (error) {
      return next(new errors.BadRequest({ errorMessage: "Invalid Input" }))
    }
    db.User.findOneAndUpdate({ _id: req.user._id }, req.body).then(result => {
      res.status(200).send(result.toAdminJSON())
    })
  }
}

class AuthenticateUser extends BaseController {
  async _implementation(req, res) {
    const token = req.header("x-auth-token")
    const valid = jwt.verify(token, "Secret")

    if (!valid) throw new this.httpResponses.UnathorizedResponse("Invalid Token")

    const user = db.User.findById(valid._id)
    if (!user) throw new this.httpResponses.UnathorizedResponse("Invalid Token")

    require("../status")(user._id)

    new this.httpResponses.SuccessResponse(user.toAdminJSON())
  }
}

class GetUser extends BaseController {
  async _implementation(req, res) {
    let role
    const user = await db.User.findById(req.params.id)
      .populate("products")
      .populate({
        path: "contacts",
        select: ["fullName", "profilePhoto", "products", "isOnline"],
        populate: {
          path: "products",
          match: { isSold: false },
          select: "_id",
        },
      })
      .exec()
    if (!user) throw new this.httpResponses.NotFoundResponse("User not found")

    req.user._id == user._id ? (role = "admin") : (role = "user")
    if (role === "admin") return new this.httpResponses.SuccessResponse(user.toAdminJSON())
    return new this.httpResponses.SuccessResponse(user.toUserJSON())
  }
}

module.exports = {
  checkAvailablity: new CheckAvailablity(),
  editUser: new EditUser(),
  getUser: new GetUser(),
  authenticateUser: new AuthenticateUser(),
  registerUser: new RegisterUser(),
  loginUser: new LoginUser(),
}
