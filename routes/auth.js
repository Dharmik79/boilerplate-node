const express = require("express");
const routes = express.Router();
const authController = require("../controller/authController");

routes.post("/login", authController.login);
routes.post("/register", authController.register);
routes.put("/reset-password", authController.resetPassword);
routes.put("/verify-reset-password", authController.verifyResetPassword);
routes.put("/reset-otp-password", authController.verifyOTPAndPassword);
routes.put("/verify-email", authController.verifyEmail);
routes.put("/verify-phone", authController.verifyPhone);
routes.put("/send-email-otp", authController.sendEmailOtp);
routes.put("/send-phone-otp", authController.sendPhoneOtp);

module.exports = routes;
