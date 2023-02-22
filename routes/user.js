const express = require("express");
const routes = express.Router();
const userController = require("../controller/userController");
const { authentication } = require("../middleware/auth");

routes.get("/profile", authentication, userController.getProfile);
routes.put("/update-profile", authentication, userController.updateProfile);
routes.put("/change-password", authentication, userController.changePassword);

module.exports = routes;
