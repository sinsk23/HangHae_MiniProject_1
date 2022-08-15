const countryInfoInputData = require("./sort_data/countryInfo.json");
const CountryInfoRepository = require("./repositories/countryInfo.repository");
const countryInfoRepository = new CountryInfoRepository();

const UsersRepository = require("./repositories/users.repository");
const usersRepository = new UsersRepository();

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
};

module.exports = dataInitializer;
