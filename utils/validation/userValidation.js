const joi = require("joi");

exports.schemaKeys = {
  firstName: joi.string(),
  lastName: joi.string(),
  gender: joi.string(),
  dob: joi.date(),
  phone: {
    countryCode: joi.string(),
    phone: joi.string(),
  },
  accountType: joi.string(),
  posts:joi.array().items(joi.string()),
  profilePicture:joi.string()
};
exports.changePassword = {
  currentPassword: joi.string().required(),
  newPassword: joi.string().required(),
};
