const express = require("express");

const MypageController = require("../controller/mypage.controller");
const mypageController = new MypageController();

const AuthController = require("../controller/auth.controller");
const authController = new AuthController();

const router = express.Router();

//마이페이지
router.get(
  "/mypage",
  authController.authMiddleware,
  mypageController.bringMypage
);

//내 결과정보도 불러오기
//(가장 마지막 추천 결과 GET)
router.get(
  "/mypage/myanswers",
  authController.authMiddleware,
  mypageController.bringMyinfo
);
