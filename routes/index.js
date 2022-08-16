const express = require("express");
const AuthRouter = require("./auth.routes");
const ResultsRouter = require("./results.routes");
// const cors = require("cors");

const MypageRouter = require("./mypage.routes");

const router = express.Router();

router.use("/results", ResultsRouter);
router.use("/mypage", MypageRouter);
router.use("/", AuthRouter);
// router.options("*", cors());

module.exports = router;
