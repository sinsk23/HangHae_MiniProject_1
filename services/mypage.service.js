const ResultsRepository = require("../repositories/results.repository");
const CountryInfoRepository = require("../repositories/countryInfo.repository");

class MypageService{
    resultsRepository = new ResultsRepository();
    
    countryinfoRepository = new CountryInfoRepository();
    







    bringMyinfo = async(resultId) =>{
        
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



module.exports = MypageService