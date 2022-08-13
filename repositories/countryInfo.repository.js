const {CountryInfo} = require("../models");


class CountryInfoRepository {
//결과 페이지 여행지정보 받기
findAllresult = async() =>{
    const allresult = await CountryInfo.findAll();

    return allresult;
  };

}

module.exports = CountryInfoRepository