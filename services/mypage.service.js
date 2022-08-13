const ResultsRepository = require("../repositories/results.repository");
const CountryInfoRepository = require("../repositories/countryInfo.repository");

class MypageService{
    resultsRepository = new ResultsRepository();
    
    countryinfoRepository = new CountryInfoRepository();
    
}



module.exports = MypageService