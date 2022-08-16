//결과 저장소에서 함수 필요한거 쓰기
const ResultsRepository = require("../repositories/results.repository");
const ResultsService = require("../services/results.service");

//결과값 그대로 마이페이지에 똑같이 보여주기
const CountryinfoRepository = require("../repositories/countryInfo.repository");

class MypageController {
  resultsRepository = new ResultsRepository();
  resultsService = new ResultsService();
  countryinfoRepository = new CountryinfoRepository();

  // 마이페이지에 넣을 나의 정보(아직은 userId, nickname 정도를 받아 응답하는 기능
  bringMypage = async (req, res, next) => {
    try {
      const { userId, nickname } = res.locals.user;
      console.log(userId, nickname);
      const result = { userId, nickname };
      return res.status(200).json(result);
    } catch (err) {
      return res.json({ statusCode: 400, message: err.message });
    }
  };

  // 마이페이지에 넣을 나의 저장된 결과지 result 받아서 반환
  bringMyinfo = async (req, res, next) => {
    try {
      const { _id } = await res.locals.user;
      const myResult = await this.resultsRepository.getResultByUserIdNo(_id);

      if (myResult) {
        const result = await this.resultsService.resultPage(myResult.resultId);
        return res.status(200).json(result);
      } else {
        return res.json({
          statusCode: 400,
          message: "설문을 먼저 진행해주세요.",
        });
      }
    } catch (err) {
      return res.json({ statusCode: 400, message: err.message });
    }
  };
}

module.exports = MypageController;
