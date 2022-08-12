const express = require("express");

const AuthController = require("../controller/auth.controller");
const authController = new AuthController();

const router = express.Router();

// 이 라우터는 대부분 로그인/아웃 관련 역할을 진행함
router.post("/signUp", authController.signUp);
router.post("/login", authController.login);
router.post("/login/withsave", authController.loginWithData);
// router.get("/logout", authController.logout);

module.exports = router;
