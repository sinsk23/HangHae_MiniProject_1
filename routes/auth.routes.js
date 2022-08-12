const express = require("express");

const AuthController = require("../controller/auth.controller");
const authController = new AuthController();

const router = express.Router();

router.post("/signUp", authController.signUp);
router.post("/login", authController.login);
router.post("/login/withsave", authController.loginWithData);
// router.get("/logout", authController.logout);

module.exports = router;
