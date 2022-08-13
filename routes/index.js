const express = require("express");
const AuthRouter = require("./auth.routes");
const ResultsRouter = require("./results.routes");

const CountryInfoRepository = require("../repositories/countryInfo.repository");
const countryInfoRepository = new CountryInfoRepository();

const MypageRouter = require("./mypage.routes");

const router = express.Router();

router.use("/", AuthRouter);
router.use("/results", ResultsRouter);
router.use("/mypage", MypageRouter);

// countryInfo 저장하는 임시 API
router.post(
  "/temporary/createCountryInfo",
  countryInfoRepository.createCountryInfo
);

module.exports = router;
