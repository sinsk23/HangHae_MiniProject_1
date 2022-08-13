const ResultsRepository = require("../repositories/results.repository");
const CountryInfoRepository = require("../repositories/countryInfo.repository");

class ResultsService {
  resultsRepository = new ResultsRepository();

  countryinfoRepository = new CountryInfoRepository();

  // 추천 알고리즘 - 우선 1~18사이 난수 반환
  recommendationFn = (answersArr) => {
    // 우선 min ~ max 사이의 랜덤값을 뱉는 함수
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }
    recommendedCountryId = getRandomInt(1, 18);

    return recommendedCountryId;
  };

  // Service.submitPage 설문 결과 Arr를 받아, 정보를 만들어내고,
  // resultDB에 저장하고, 저장한 resultId반환
  submitPage = async (answersArr) => {
    // answersArr 어떤 함수에 집어 넣으면, recommendedCountryId가 나옴
    const recommendedCountryId = this.recommendationFn(answersArr);

    const resultId = await this.resultsRepository.createData(
      answersArr,
      recommendedCountryId
    );

    return { resultId };
  };

  //설문 결과
  resultPage = async (resultId) => {
    console.log(resultId, "결과 아이디");
    const detail = await this.countryinfoRepository.findAllresult(resultId);
    console.log(detail, "전체 결과 ");
    return detail;
  };
}

module.exports = ResultsService;
