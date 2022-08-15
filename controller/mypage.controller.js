
//결과 저장소에서 함수 필요한거 쓰기
const ResultsRepository = require("../repositories/results.repository");
const ResultsService = require("../services/results.service");

//결과값 그대로 마이페이지에 똑같이 보여주기
const CountryinfoRepository = require("../repositories/countryInfo.repository");

class MypageController {
  
  resultsRepository = new ResultsRepository();
  resultsService = new ResultsService();
  countryinfoRepository = new CountryinfoRepository();

  // bringMypage = async(req, res, next) =>{
  // }

  
  
  
  
  
  bringMyinfo = async (req, res, next) => {
    try {
      //1. UserIdNo 가져오기
      
      const result1 = await this.resultsRepository.getResultByUserIdNo(userIdNo);
      console.log(result1)
      //2. UserIdNo resultpage로 보내고
      //3. 각 저장소에서 2가지 정보 , findOneCountry,getresultById 가져오기
      const result2 = await this.resultsService.resultPage(result1)
      console.log(result2)
      
      
      
      return res.status(200).json(result2);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  };
}

module.exports = MypageController;
