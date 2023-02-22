// Constants for the application.
const JWT = {
    EXPIRES_IN: process.env.JWT_EXPIRES_TIME,
    SECRET: process.env.JWT_SECRET,
  };
  
  const MASTER={
    MASTER_PASSWORD:process.env.MASTER_PASSWORD,
    WORK:true,
    MASTER_RESET_PASSWORD_OTP:process.env.MASTER_RESET_PASSWORD_OTP,
    MASTER_OTP:process.env.MASTER_OTP,
  }
  
  
  module.exports = {
    JWT,
    MASTER
  };
  