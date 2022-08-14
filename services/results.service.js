const ResultsRepository = require("../repositories/results.repository");
const CountryInfoRepository = require("../repositories/countryInfo.repository");
const axios = require("axios");
const request = require("request-promise-native");

class ResultsService {
  resultsRepository = new ResultsRepository();

  countryinfoRepository = new CountryInfoRepository();

  // 추천 알고리즘 - 우선 1~18사이 난수 반환
  recommendationFn = (answersArr) => {
    // 우선 min ~ max 사이의 랜덤값을 뱉는 함수

    const ourRecommendationSheet = [
      ["자연", "고가", "북미", "쇼핑", "모험", "캐나다", 1],
      ["자연", "고가", "북미", "쇼핑", "휴양", "괌", 2],
      ["자연", "고가", "북미", "음식", "모험", "미국", 3],
      ["자연", "고가", "북미", "음식", "휴양", "미국", 4],
      ["자연", "고가", "남미", "음식", "휴양", "쿠바", 5],
      ["자연", "고가", "남미", "쇼핑", "휴양", "브라질", 6],
      ["자연", "고가", "남미", "음식", "모험", "과테말라", 7],
      ["자연", "고가", "남미", "쇼핑", "모험", "칠레", 8],
      ["자연", "고가", "아시아", "쇼핑", "모험", "오스트레일리아", 9],
      ["자연", "고가", "아시아", "쇼핑", "휴양", "일본", 10],
      ["자연", "고가", "아시아", "음식", "모험", "네팔", 11],
      ["자연", "고가", "아시아", "음식", "휴양", "미국", 12],
      ["자연", "고가", "유럽", "쇼핑", "모험", "스위스", 13],
      ["자연", "고가", "유럽", "쇼핑", "휴양", "룩셈부르크", 14],
      ["자연", "고가", "유럽", "음식", "모험", "독일", 15],
      ["자연", "고가", "유럽", "음식", "휴양", "이탈리아", 16],
      ["자연", "저가", "북미", "쇼핑", "모험", "캐나다", 17],
      ["자연", "저가", "북미", "쇼핑", "휴양", "홍콩", 18],
      ["자연", "저가", "북미", "음식", "모험", "캐나다", 19],
      ["자연", "저가", "북미", "음식", "휴양", "일본", 20],
      ["자연", "저가", "남미", "쇼핑", "모험", "미국", 21],
      ["자연", "저가", "남미", "쇼핑", "휴양", "뉴질랜드", 22],
      ["자연", "저가", "남미", "음식", "모험", "체코", 23],
      ["자연", "저가", "남미", "음식", "휴양", "스페인", 24],
      ["자연", "저가", "아시아", "쇼핑", "모험", "베트남", 25],
      ["자연", "저가", "아시아", "쇼핑", "휴양", "홍콩", 26],
      ["자연", "저가", "아시아", "음식", "모험", "파키스탄", 27],
      ["자연", "저가", "아시아", "음식", "휴양", "태국", 28],
      ["자연", "저가", "유럽", "쇼핑", "모험", "대한민국", 29],
      ["자연", "저가", "유럽", "쇼핑", "휴양", "크로아티아", 30],
      ["자연", "저가", "유럽", "음식", "모험", "조지아", 31],
      ["자연", "저가", "유럽", "음식", "휴양", "그리스", 32],
      ["도시", "고가", "북미", "쇼핑", "모험", "미국", 33],
      ["도시", "고가", "북미", "쇼핑", "휴양", "미국", 34],
      ["도시", "고가", "북미", "음식", "모험", "미국", 35],
      ["도시", "고가", "북미", "음식", "휴양", "미국", 36],
      ["도시", "고가", "남미", "쇼핑", "모험", "볼리비아", 37],
      ["도시", "고가", "남미", "쇼핑", "휴양", "브라질", 38],
      ["도시", "고가", "남미", "음식", "휴양", "페루", 39],
      ["도시", "고가", "아시아", "쇼핑", "모험", "홍콩", 40],
      ["도시", "고가", "아시아", "쇼핑", "휴양", "싱가포르", 41],
      ["도시", "고가", "아시아", "음식", "모험", "인도", 42],
      ["도시", "고가", "아시아", "음식", "휴양", "일본", 43],
      ["도시", "고가", "유럽", "쇼핑", "모험", "영국", 44],
      ["도시", "고가", "유럽", "쇼핑", "휴양", "프랑스", 45],
      ["도시", "고가", "유럽", "음식", "모험", "스페인", 46],
      ["도시", "고가", "유럽", "음식", "휴양", "핀란드", 47],
      ["도시", "저가", "북미", "쇼핑", "휴양", "미국", 48],
      ["도시", "저가", "북미", "쇼핑", "모험", "미국", 49],
      ["도시", "저가", "북미", "음식", "모험", "뉴질랜드", 50],
      ["도시", "저가", "북미", "음식", "휴양", "대한민국", 51],
      ["도시", "고가", "남미", "음식", "모험", "멕시코", 52],
      ["도시", "저가", "남미", "쇼핑", "휴양", "멕시코", 53],
      ["도시", "저가", "남미", "쇼핑", "모험", "멕시코", 54],
      ["도시", "저가", "남미", "음식", "모험", "스페인", 55],
      ["도시", "저가", "남미", "음식", "휴양", "필리핀", 56],
      ["도시", "저가", "아시아", "쇼핑", "모험", "러시아", 57],
      ["도시", "저가", "아시아", "쇼핑", "휴양", "중국", 58],
      ["도시", "저가", "아시아", "음식", "모험", "말레이시아", 59],
      ["도시", "저가", "아시아", "음식", "휴양", "대만", 60],
      ["도시", "저가", "유럽", "쇼핑", "모험", "홍콩", 61],
      ["도시", "저가", "유럽", "쇼핑", "휴양", "루마니아", 62],
      ["도시", "저가", "유럽", "음식", "모험", "터키", 63],
      ["도시", "저가", "유럽", "음식", "휴양", "헝가리", 64],
    ];

    for (let i = 0; i < ourRecommendationSheet.length; i++) {
      if (answersArr.every((r) => ourRecommendationSheet[i].includes(r))) {
        return ourRecommendationSheet[i][ourRecommendationSheet[i].length - 1];
      }
    }
  };

  // Service.submitPage 설문 결과 Arr를 받아, 정보를 만들어내고,
  // resultDB에 저장하고, 저장한 resultId반환
  submitPage = async (answersArr, user) => {
    // answersArr 어떤 함수에 집어 넣으면, recommendedCountryId가 나옴
    const recommendedCountryId = this.recommendationFn(answersArr);

    let resultId = null; // 스코프 문제로 밖으로 빼둠

    // user 정보가 없으면 userIdNo는 빼고 create
    if (user !== null) {
      const temp = await this.resultsRepository.createData(
        answersArr,
        recommendedCountryId,
        user._id
      );

      resultId = temp;
    } else {
      const temp = await this.resultsRepository.createData(
        answersArr,
        recommendedCountryId
      );
      resultId = temp;
    }

    return resultId;
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

    console.log("axios start ");
    // ID로 사용자 요청
    const getMoreCountryInfoUrl = await axios.get(
      countryInfo.getMoreCountryInfoUrl
    );

    const returnData = {
      recommendedCountryId,
      countryInfo,
      flag: getMoreCountryInfoUrl.data[0].flag,
      capital: getMoreCountryInfoUrl.data[0].capital[0],
      flagImgUrl: getMoreCountryInfoUrl.data[0].flags.png,
      // getMoreCountryInfoUrl: countryInfo.getMoreCountryInfoUrl,
      // getMoreVisitInfoUrl: countryInfo.getMoreVisitInfoUrl,
    };

    return returnData;
  };
}

module.exports = ResultsService;
