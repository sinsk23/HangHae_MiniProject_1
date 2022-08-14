//마이페이지서비스
// const MypageService = require("../services/mypage.service");

//결과 저장소에서 함수 필요한거 쓰기
const ResultsRepository = require("../repositories/results.repository");
const ResultsService = require("../services/results.service");

//결과값 그대로 마이페이지에 똑같이 보여주기
const CountryinfoRepository = require("../repositories/countryInfo.repository");

class MypageController {
  //   mypageService = new MypageService();
  resultsRepository = new ResultsRepository();
  ResultsService = new ResultsService();
  countryinfoRepository = new CountryinfoRepository();

  // bringMypage = async(req, res, next) =>{
  // }

  bringMyinfo = async (req, res, next) => {
    try {
      const result = await this.ResultsService.resultPage();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  };
}

module.exports = MypageController;
