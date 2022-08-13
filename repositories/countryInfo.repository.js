const {CountryInfo} = require("../models");


class CountryInfoRepository {
//결과 페이지 여행지정보 받기
findAllresult = async(resultId) =>{
    const allresult = await CountryInfo.findByPk(resultId)
                    
    return allresult;
  };

}

module.exports = CountryInfoRepository