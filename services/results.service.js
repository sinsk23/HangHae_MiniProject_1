const ResultsRepository = require("../repositories/results.repository");
const CountryInfoRepository = require("../repositories/countryInfo.repository");

class ResultsService {
  resultsRepository = new ResultsRepository();

  countryinfoRepository = new CountryInfoRepository();

  // 추천 알고리즘 - 우선 1~18사이 난수 반환
  recommendationFn = (answersArr) => {
    // 우선 min ~ max 사이의 랜덤값을 뱉는 함수

    const ourRecommendationSheet = [
      ["자연", "고가", "북미", "쇼핑", "휴양", "괌", 5],
      ["자연", "고가", "아시아", "음식", "모험", "네팔", 1],
      ["도시", "저가", "아시아", "음식", "휴양", "대만", 10],
      ["도시", "저가", "유럽", "쇼핑", "모험", "러시아", 7],
      ["도시", "고가", "남미", "음식", "모험", "멕시코", 4],
      ["도시", "고가", "북미", "쇼핑", "휴양", "미국", 16],
      ["자연", "저가", "아시아", "쇼핑", "모험", "베트남", 15],
      ["자연", "고가", "남미", "음식", "모험", "브라질", 3],
      ["도시", "고가", "유럽", "음식", "모험", "스페인", 14],
      ["도시", "고가", "아시아", "쇼핑", "휴양", "싱가포르", 13],
      ["도시", "고가", "유럽", "쇼핑", "모험", "영국", 12],
      ["도시", "고가", "아시아", "음식", "모험", "인도", 2],
      ["도시", "저가", "아시아", "음식", "모험", "일본", 17],
      ["도시", "저가", "아시아", "쇼핑", "모험", "중국", 6],
      ["자연", "고가", "북미", "쇼핑", "모험", "캐나다", 9],
      ["자연", "저가", "아시아", "음식", "휴양", "태국", 8],
      ["도시", "고가", "유럽", "음식", "휴양", "프랑스", 18],
      ["자연", "고가", "아시아", "쇼핑", "모험", "호주", 11],
    ];

    for (let i = 0; i < ourRecommendationSheet.length; i++) {
      if (answersArr.every((r) => ourRecommendationSheet[i].includes(r))) {
        return ourRecommendationSheet[i][ourRecommendationSheet[i].length - 1];
      }
    }
  };

  // Service.submitPage 설문 결과 Arr를 받아, 정보를 만들어내고,
  // resultDB에 저장하고, 저장한 resultId반환
  submitPage = async (answersArr) => {
    // answersArr 어떤 함수에 집어 넣으면, recommendedCountryId가 나옴
    const recommendedCountryId = this.recommendationFn(answersArr);

    const { resultId } = await this.resultsRepository.createData(
      answersArr,
      recommendedCountryId
    );

    return { resultId };
  };

  //설문 결과
  resultPage = async (resultId) => {
    console.log(resultId, "결과 아이디");

    const { recommendedCountryId } = await this.resultsRepository.getResultById(
      resultId
    );

    const countryInfo = await this.countryinfoRepository.findOneCounty(
      recommendedCountryId
    );

    console.log(recommendedCountryId, countryInfo);

    const returnData = {
      recommendedCountryId,
      countryInfo,
    };

    return returnData;
  };
}

module.exports = ResultsService;
