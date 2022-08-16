const countryInfoInputData = require("./sort_data/countryInfo.json");
const CountryInfoRepository = require("./repositories/countryInfo.repository");
const countryInfoRepository = new CountryInfoRepository();

const ResultsService = require("./services/results.service");
const resultsService = new ResultsService();

const UsersRepository = require("./repositories/users.repository");
const usersRepository = new UsersRepository();

const sampleAnswerArray = [
  ["자연", "저가", "아시아", "쇼핑", "휴양"],
  ["자연", "저가", "아시아", "음식", "모험"],
  ["자연", "저가", "아시아", "음식", "휴양"],
  ["자연", "저가", "유럽", "쇼핑", "모험"],
  ["자연", "저가", "유럽", "쇼핑", "휴양"],
  ["자연", "저가", "유럽", "음식", "모험"],
  ["자연", "저가", "유럽", "음식", "휴양"],
  ["도시", "고가", "북미", "쇼핑", "모험"],
  ["도시", "고가", "북미", "쇼핑", "휴양"],
  ["도시", "저가", "북미", "쇼핑", "모험"],
  ["도시", "저가", "북미", "음식", "모험"],
  ["도시", "저가", "북미", "음식", "휴양"],
  ["도시", "고가", "남미", "음식", "모험"],
  ["도시", "저가", "남미", "쇼핑", "휴양"],
  ["도시", "저가", "남미", "쇼핑", "모험"],
  ["도시", "저가", "남미", "음식", "모험"],
  ["도시", "저가", "남미", "음식", "휴양"],
  ["도시", "저가", "아시아", "쇼핑", "모험"],
];

dataInitializer = async () => {
  // countryInfo 64개 데이터 삽입
  for (let i = 0; i < countryInfoInputData.length; i++) {
    countryInfoRepository
      .createCountryInfoDirectFn(countryInfoInputData[i])
      .then((e) => console.log(e));
  }

  // 초기 ID 5개 생성
  for (let i = 0; i < 5; i++) {
    usersRepository
      .createUser("tester" + i, "TESTER" + i, "12345")
      .then((e) => console.log(e));
  }

  for (let i = 0; i < sampleAnswerArray.length; i++) {
    resultsService.submitPage(sampleAnswerArray[i], null);
  }
};

module.exports = dataInitializer;

/*
      [["자연", "저가", "아시아", "쇼핑", "휴양"],
      ["자연", "저가", "아시아", "음식", "모험"],
      ["자연", "저가", "아시아", "음식", "휴양"],
      ["자연", "저가", "유럽", "쇼핑", "모험"],
      ["자연", "저가", "유럽", "쇼핑", "휴양"],
      ["자연", "저가", "유럽", "음식", "모험"],
      ["자연", "저가", "유럽", "음식", "휴양"],
      ["도시", "고가", "북미", "쇼핑", "모험"],
      ["도시", "고가", "북미", "쇼핑", "휴양"],
      ["도시", "저가", "북미", "쇼핑", "모험"],
      ["도시", "저가", "북미", "음식", "모험"],
      ["도시", "저가", "북미", "음식", "휴양"],
      ["도시", "고가", "남미", "음식", "모험"],
      ["도시", "저가", "남미", "쇼핑", "휴양"],
      ["도시", "저가", "남미", "쇼핑", "모험"],
      ["도시", "저가", "남미", "음식", "모험"],
      ["도시", "저가", "남미", "음식", "휴양"],
      ["도시", "저가", "아시아", "쇼핑", "모험"]]
*/
