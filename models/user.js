var mongoose = require("mongoose");
const Joi = require("@hapi/joi");

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

const schemaValidate = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required(),
  email: Joi.string()
    .min(6)
    .max(100)
    .required(),
  password: Joi.string()
    .min(3)
    .max(255)
    .required()
});

const schemaLogin = Joi.object({
  email: Joi.string()
    .min(3)
    .max(100)
    .required(),
  password: Joi.string()
    .min(6)
    .max(100)
    .required()
});

module.exports.User = User;
module.exports.schemaValidate = schemaValidate;
module.exports.schemaLogin = schemaLogin;
