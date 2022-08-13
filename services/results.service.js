const ResultsRepository = require("../repositories/results.repository")
const CountryInfoRepository = require("../repositories/countryInfo.repository"
)

class ResultsService{
    resultsRepository = new ResultsRepository();
    
    countryinfoRepository = new CountryInfoRepository();

    //설문
    submitPage = async(answersArr) =>{
        
        const createData = await this.resultsRepository.createData(
            answersArr,
        );
    
    return{
        answersArr :createData.answersArr,
    };

    }
    //설문 결과
    resultPage = async(resultId) => {
        console.log(resultId,"결과 아이디")
        const detail = await this.countryinfoRepository.findAllresult(resultId);
        console.log(detail, "전체 결과 ")
        return detail
    }


}

module.exports = ResultsService