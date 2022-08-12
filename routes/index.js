const express = require("express");
// const ResultsRouter = require("./results.route");
// const MypageRouter = require("./mypage.route");
const AuthRouter = require("./auth.routes");

const router = express.Router();

// router.use("/results", ResultsRouter);
// router.use("/mypage", MypageRouter);
router.use("/", AuthRouter);

module.exports = router;
