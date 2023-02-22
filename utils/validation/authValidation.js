const joi = require("joi");

exports.schemaKeys = {
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
};
exports.register = {
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  phone: joi.object().keys({
    phone: joi.string().required(),
    countryCode: joi.string().default("+1"),
  }),
};
exports.login = {
  email: joi.string().required(),
  password: joi.string().required(),
};

exports.resetPassword = {
  email: joi.string().required()
};

exports.resetVerifyPassword = {
  email: joi.string().required(),
  OTP:joi.string().required()
};

exports.verifyOTPAndPassword = {
  email: joi.string().required(),
  OTP:joi.string().required(),
  password:joi.string().required()
};

exports.verifyEmail = {
  email: joi.string().required(),
  OTP:joi.string().required()
};

exports.verifyPhone = {
  email: joi.string().required(),
  OTP:joi.string().required()
};

exports.sendEmailOtp= {
  email: joi.string().required(),
};

exports.sendPhoneOtp= {
  email: joi.string().required(),
};


