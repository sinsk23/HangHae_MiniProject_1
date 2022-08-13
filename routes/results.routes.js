const express = require("express");

const ResultsController = require("../controller/results.controller");
const resultsController = new ResultsController();

const router = express.Router();

// FE단에서 /submit answersArr 데이터 받고 데이터를 :reultId로 보내 받기

//설문페이지
router.post("/submit", resultsController.submitPage);

//결과페이지
router.get("/:resultId", resultsController.resultPage);

module.exports = router;
