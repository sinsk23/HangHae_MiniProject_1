const ResultsService = require("../services/results.service");
const ResultsRepository = require("../repositories/results.repository");
const CountryinfoRepository = require("../repositories/countryInfo.repository");
const UserRepository = require("../repositories/users.repository");
const jwt = require("jsonwebtoken");
const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

class ResultsController {
  resultsService = new ResultsService();
  resultsRepository = new ResultsRepository();
  countryinfoRepository = new CountryinfoRepository();
  userRepository = new UserRepository();

  //전체 결과 페이지 ,api/results/
  getAllCountries = async (req, res, next) => {
    try {
      const resultAll = await this.resultsService.getAllCountries();
      return res.status(200).json(resultAll);

      // const result = await CountryInfo.findAll({});
      // return res.status(200).json(result);
    } catch (err) {
      return res.json({ statusCode: 400, message: err.message });
    }
  };

  getAllResults = async (req, res, next) => {
    try {
      // 지금까지 쌓여 있는 수 (최대 100개 불러옴 )
      const results = await this.resultsRepository.getAllResults();

      const data = [];
      for (let i = 0; i < results.length; i++) {
        const result = await this.resultsService.resultPage(
          results[i].resultId
        );
        data.push(result);
      }

      return res.status(200).json(data);
    } catch (err) {
      return res.json({ statusCode: 400, message: err.message });
    }
  };

  // Controller.submitPage : FE에서 설문 받아서 결과 저장하고, 저장된 resultId 반환
  submitPage = async (req, res, next) => {
    try {
      // 설문결과 어레이를 받아서

      console.log("req.cookies.token:", req.cookies.token);
      if (req.cookies.token) {
        const authorization = req.cookies.token;
        console.log("authorization:", authorization);
        const [authType, authToken] = (authorization || "").split(" ");
        jwt.verify(authToken, MY_SECRET_KEY, async (error, decoded) => {
          let user = await this.userRepository.getUserbyUserId(decoded.userId);
          console.log(
            "로그인된 쿠키 체크 res.cookies.token -> decoded.user의 userId는? 🤔!! :",
            user.userId
          );
        });
      }

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
      return res.json({ statusCode: 400, message: err.message });
    }
  };

  // 결과 데이터 GET , api/results/:resultId
  resultPage = async (req, res, next) => {
    try {
      const { resultId } = req.params;
      const result = await this.resultsService.resultPage(resultId);
      return res.status(200).json(result);
    } catch (err) {
      return res.json({ statusCode: 400, message: err.message });
    }
  };
}

module.exports = ResultsController;
