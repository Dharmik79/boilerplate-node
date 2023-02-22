const User = require("../model/user");
const service = require("../utils/dbService");

module.exports = {
  changePassword: async (user, currentPassword, newPassword) => {
    try {
      const isPasswordMatched = await user.isPasswordMatch(currentPassword);
      if (isPasswordMatched) {
        await service.findOneAndUpdateDocument(
          User,
          { _id: user._id },
          { password: newPassword }
        );
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateProfile: async (userId, body) => {
    try {
      let userData = await service.findOneAndUpdateDocument(
        User,
        { _id: userId },
        body,
        { new: true }
      );
      return userData.toJSON();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

};
