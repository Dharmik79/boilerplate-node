const authService = require("../services/auth");
const validation = require("../utils/validateRequest");
const authSchemaKey = require("../utils/validation/authValidation");
const util = require("../utils/messages");
const _ = require("lodash");
const { MESSAGE } = require("../config/message");
module.exports = {
  login: async (req, res) => {
    try {
      let isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.login
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }
      let { email, password } = req.body;
      let result = await authService.loginUser(email, password, req);
      if (result) {
        return util.loginSuccess(result, res);
      } else {
        return util.loginFailed(MESSAGE.INCORRECT_PASSWORD, res);
      }
    } catch (error) {
      console.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },
  register: async (req, res) => {
    try {
      let isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.register
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }
      let result = await authService.registration(req.body);
      res.message = MESSAGE.USER_REGISTERED.message;
      return util.successResponse(result, res);
    } catch (error) {
      console.error("Error - register", error);
      return util.failureResponse(error, res);
    }
  },
  resetPassword: async (req, res) => {
    try {
      let isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.resetPassword
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }
      let { email } = req.body;
      await authService.resetPassword(email);
      res.message = MESSAGE.RESET_PASSWORD.message;
      return util.resetPassword(res);
    } catch (error) {
      console.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },

  verifyResetPassword: async (req, res) => {
    try {
      let isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.resetVerifyPassword
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }
      let { email, OTP } = req.body;
      let result = await authService.verifyResetPassword(email, OTP);
      if (result) {
        return util.successResponse(result, res);
      } else {
        res.message = MESSAGE.INCORRECT_OTP.message;
        return util.failureResponse({}, res);
      }
    } catch (error) {
      console.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },
  verifyOTPAndPassword: async (req, res) => {
    try {
      let isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.verifyOTPAndPassword
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }
      let { email, OTP, password } = req.body;
      let result = await authService.verifyOTPAndPassword(email, OTP, password);
      if (result) {
        res.message = MESSAGE.RESET_PASSWORD_SUCCESS.message;
        return util.successResponse(result, res);
      } else {
        res.message = MESSAGE.INCORRECT_OTP.message;
        return util.failureResponse({}, res);
      }
    } catch (error) {
      console.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },

  verifyEmail: async (req, res) => {
    try {
      let isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.verifyEmail
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }
      let { email, OTP } = req.body;
      let result = await authService.verifyEmail(email, OTP);
      if (result) {
        res.message = MESSAGE.OTP_VERIFIED_SUCCESS.message;
        return util.successResponse(result, res);
      } else {
        res.message = MESSAGE.INCORRECT_OTP.message;
        return util.failureResponse({}, res);
      }
    } catch (error) {
      console.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },

  verifyPhone: async (req, res) => {
    try {
      let isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.verifyPhone
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }
      let { email, OTP } = req.body;
      let result = await authService.verifyPhone(email, OTP);
      if (result) {
        res.message = MESSAGE.OTP_VERIFIED_SUCCESS.message;
        return util.successResponse(result, res);
      } else {
        res.message = MESSAGE.INCORRECT_OTP.message;
        return util.failureResponse({}, res);
      }
    } catch (error) {
      console.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },

  sendEmailOtp: async (req, res) => {
    try {
      let isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.sendEmailOtp
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }
      let { email } = req.body;
      let result = await authService.sendEmailOtp(email);

      res.message = MESSAGE.OTP_SEND.message;
      return util.successResponse(result, res);
    } catch (error) {
      console.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },

  sendPhoneOtp: async (req, res) => {
    try {
      let isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.sendPhoneOtp
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }
      let { email } = req.body;
      let result = await authService.sendPhoneOtp(email);

      res.message = MESSAGE.OTP_SEND.message;
      return util.successResponse(result, res);
    } catch (error) {
      console.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },
};
