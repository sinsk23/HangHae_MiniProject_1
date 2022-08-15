const { CountryInfo } = require("../models");

class CountryInfoRepository {
  //결과 페이지 여행자정보 전체 받기
  findAllCountry = async ()=>{

    
    const result = await CountryInfo.findAll() 
    
    return result;
    
  };




  //결과 페이지 여행지정보 받기
  findOneCounty = async (recommendedCountryId) => {
    const result = await CountryInfo.findOne({
      where: { recommendedId: recommendedCountryId },
    });

    return result;
  };

  // app에서 바로 넣기
  createCountryInfoDirectFn = async (obj) => {
    const {
      countryCode,
      countryName,
      countryDomain,
      continent,
      headText,
      detailText,
      recommendedId,
      resultImageUrl,
      officialWebpage,
      getMoreCountryInfoUrl,
      getMoreVisitInfoUrl,
    } = obj;

    const allresult = await CountryInfo.create({
      countryCode,
      countryName,
      countryDomain,
      continent,
      headText,
      detailText,
      recommendedId,
      resultImageUrl,
      officialWebpage,
      getMoreCountryInfoUrl,
      getMoreVisitInfoUrl,
    });

    return allresult;
  };
}

module.exports = CountryInfoRepository;
