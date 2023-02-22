const User = require("../model/user");
const service = require("../utils/dbService");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { JWT, MASTER } = require("../config/authConstant");
const { MESSAGE } = require(`../config/message`);
async function generateToken(id, email, secret) {
  return jwt.sign(
    {
      id: id,
      email: email,
    },
    secret,
    {
      expiresIn: JWT.EXPIRES_IN * 60,
    }
  );
}

module.exports = {
  loginUser: async (email, password, req) => {
    try {
      email = email.toLowerCase();
      let user = await service.findUser(email);
      if (user) {
        const isPasswordMatched = await user.isPasswordMatch(password);
        if (isPasswordMatched) {
          if (user.isEmailVerified ) {
            user = user.toJSON();
            user.token = await generateToken(user._id, email, JWT.SECRET);
            return user;
          } else {
            if (!user.isEmailVerified) {
              // Send Otp
            }
            // if (!user.isPhoneVerified) {
             // Send OTP to phone
            // }
            return {
              isEmailVerified: user.isEmailVerified,
               isPhoneVerified: user.isPhoneVerified,
            };
          }
        } else {
          return false;
        }
      } else {
        throw MESSAGE.EMAIL_NOT_EXISTS;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  registration: async (body) => {
    try {
      body.email = body.email.toLowerCase();
      const user = await service.findUser(body.email);
      if (user) {
        throw MESSAGE.EMAIL_ALREADY_EXISTS;
      }
      let result = await service.createDocument(User, body);
      result = result.toJSON();
      // result.token = await generateToken(result._id, body.email, JWT.SECRET);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  resetPassword: async (email) => {
    try {
      email = email.toLowerCase();
      let user = await service.findUser(email);

      if (user) {
        const OTP = Math.floor(100000 + Math.random() * 900000);
        await service.findOneAndUpdateDocument(
          User,
          { _id: user._id },
          {
            resetPasswordOTP: OTP,
          }
        );
        // send OTP to email
        return true;
      } else {
        throw MESSAGE.EMAIL_NOT_EXISTS;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  verifyResetPassword: async (email, OTP) => {
    try {
      email = email.toLowerCase();
      let user = await service.findUser(email);

      if (user) {
        return (
          user.resetPasswordOTP === OTP ||
          OTP === MASTER.MASTER_RESET_PASSWORD_OTP
        );
      } else {
        throw MESSAGE.EMAIL_NOT_EXISTS;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  verifyOTPAndPassword: async (email, OTP, password) => {
    try {
      email = email.toLowerCase();
      let user = await service.findUser(email);

      if (user) {
        if (
          user.resetPasswordOTP === OTP ||
          OTP === MASTER.MASTER_RESET_PASSWORD_OTP
        ) {
          await service.findOneAndUpdateDocument(
            User,
            { _id: user._id },
            {
              $unset: {
                resetPasswordOTP: 1,
              },
              isEmailVerified: true,
              password,
            },
            { new: true }
          );

          return true;
        } else {
          return false;
        }
      } else {
        throw MESSAGE.EMAIL_NOT_EXISTS;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  verifyEmail: async (email, OTP) => {
    try {
      email = email.toLowerCase();
      let user = await service.findUser(email);

      if (user) {
        if (user.emailOTP === OTP || OTP === MASTER.MASTER_OTP) {
          await service.findOneAndUpdateDocument(
            User,
            { _id: user._id },
            {
              $unset: {
                emailOTP: 1,
              },
              isEmailVerified: true,
            },
            { new: true }
          );

          return true;
        } else {
          return false;
        }
      } else {
        throw MESSAGE.EMAIL_NOT_EXISTS;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  verifyPhone: async (email, OTP) => {
    try {
      email = email.toLowerCase();
      let user = await service.findUser(email);

      if (user) {
        if (user.phoneOTP === OTP || OTP === MASTER.MASTER_OTP) {
          await service.findOneAndUpdateDocument(
            User,
            { _id: user._id },
            {
              $unset: {
                phoneOTP: 1,
              },
              isPhoneVerified: true,
            },
            { new: true }
          );

          return true;
        } else {
          return false;
        }
      } else {
        throw MESSAGE.EMAIL_NOT_EXISTS;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  sendEmailOtp: async (email) => {
    try {
      email = email.toLowerCase();
      let user = await service.findUser(email);

      if (user) {
        const OTP = Math.floor(100000 + Math.random() * 900000);
        // send Email OTP
        await service.findOneAndUpdateDocument(
          User,
          { _id: user._id },
          {
            emailOTP: OTP,
          },
          { new: true }
        );

        return true;
      } else {
        throw MESSAGE.EMAIL_NOT_EXISTS;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  sendPhoneOtp: async (email) => {
    try {
      email = email.toLowerCase();
      let user = await service.findUser(email);

      if (user) {
        const OTP = Math.floor(100000 + Math.random() * 900000);
        // send Phone OTP
        await service.findOneAndUpdateDocument(
          User,
          { _id: user._id },
          {
            phoneOTP: OTP,
          },
          { new: true }
        );

        return true;
      } else {
        throw MESSAGE.EMAIL_NOT_EXISTS;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
