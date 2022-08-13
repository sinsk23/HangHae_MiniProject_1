//마이페이지서비스
const MypageService = require("../services/mypage.service");
//결과 저장소에서 함수 필요한거 쓰기
const ResultsRepository = require("../repositories/results.repository");
//결과값 그대로 마이페이지에 똑같이 보여주기
const CountryinfoRepository = require("../repositories/countryInfo.repository");



class MypageController {
  mypageService = new MypageService();
  resultsRepository = new ResultsRepository();
  countryinfoRepository = new CountryinfoRepository();
  
  
  
  // bringMypage = async(req, res, next) =>{
  // }













  

//   bringMyinfo = async(req, res, next) =>{
//   }
}

module.exports = MypageController;
