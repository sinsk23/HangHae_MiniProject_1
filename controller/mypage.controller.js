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

  // 마이페이지에 넣을 나의 정보(아직은 userId, nickname 정도를 받아 응답하는 기능
  bringMypage = async (req, res, next) => {
    try {
      console.log(res.locals.user);
      const { userId, nickname } = res.locals.user;

      const result = { userId, nickname };

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  };

  // 마이페이지에 넣을 나의 저장된 결과지 result 받아서 반환
  bringMyinfo = async (req, res, next) => {
    try {
      const { _id } = res.locals.user;
      console.log(_id);

      const { resultId } = await this.resultsRepository.getResultByUserIdNo(
        _id
      );

      const result = await this.ResultsService.resultPage(resultId);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  };
}

module.exports = MypageController;
