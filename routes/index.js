const express = require("express");
const AuthRouter = require("./auth.routes");
const ResultsRouter = require("./results.routes");
// const MypageRouter = require("./mypage.route");


const router = express.Router();

router.use("/", AuthRouter);
router.use("/results", ResultsRouter);
// router.use("/mypage", MypageRouter);


module.exports = router;
