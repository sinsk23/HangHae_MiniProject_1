const ResultsService = require("../services/results.service");
const ResultsRepository = require("../repositories/results.repository");

const CountryinfoRepository = require("../repositories/countryInfo.repository");

class ResultsController {
  resultsService = new ResultsService();
  resultsRepository = new ResultsRepository();

  countryinfoRepository = new CountryinfoRepository();
//전체 결과 페이지 ,api/results/
  resultAllPage = async (req, res, next)=>{
    try{
      
      const resultAll = await this.resultsService.resultAllPage();
      return res.status(200).json(resultAll);
      
      // const result = await CountryInfo.findAll({});
      // return res.status(200).json(result);
    }
    catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }



  // Controller.submitPage : FE에서 설문 받아서 결과 저장하고, 저장된 resultId 반환
  submitPage = async (req, res, next) => {
    try {
      // 설문결과 어레이를 받아서

      const { user } = await res.locals;
      const { answersArr } = req.body;

      // console.log(answersArr);
      // 서비스에 전달해 만들어진 Id를 전달받음
      const { resultId } = await this.resultsService.submitPage(
        answersArr,
        user
      );

      return res.status(201).json({ resultId });
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  };

  // 결과 데이터 GET , api/results/:resultId
  resultPage = async (req, res, next) => {
    try {
      const { resultId } = req.params;
      const result = await this.resultsService.resultPage(resultId);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  };
}

module.exports = ResultsController;
