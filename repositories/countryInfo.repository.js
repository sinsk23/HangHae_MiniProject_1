const { CountryInfo } = require("../models");

class CountryInfoRepository {
  //결과 페이지 여행지정보 받기
  findOneCounty = async (recommendedCountryId) => {
    const result = await CountryInfo.findOne({
      where: { recommendedId: recommendedCountryId },
    });

    return result;
  };

  createCountryInfo = async (req, res, next) => {
    const {
      countryCode,
      countryName,
      countryDomain,
      canVisit,
      visitInfo,
      continent,
      capitalCity,
      resultText,
      recommendedId,
      resultImageUrl,
      officialWebpage,
      getMoreDetail,
    } = req.body;

    const allresult = await CountryInfo.create({
      countryCode,
      countryName,
      countryDomain,
      canVisit,
      visitInfo,
      continent,
      capitalCity,
      resultText,
      recommendedId,
      resultImageUrl,
      officialWebpage,
      getMoreDetail,
    });

    return res.status(200).send(allresult);
  };
}

module.exports = CountryInfoRepository;
