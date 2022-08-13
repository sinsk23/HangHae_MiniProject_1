const ResultsService = require("../services/results.service");
const ResultsRepository = require("../repositories/results.repository");

const CountryinfoService = require("../services/results.service");
const CountryinfoRepository = require("../repositories/countryInfo.repository");


class ResultsController{
    resultsService = new ResultsService();
    resultsRepository = new ResultsRepository();
    
    countryinfoService = new CountryinfoService();
    countryinfoRepository = new CountryinfoRepository();
    
    // FE에서 설문 받기
    submitPage = async (req,res,next)=>{
        try{
            console.log("** --- ResultsController.submitPage ---");
            
            
            const {answersArr} = req.body;
            const createData = await this.resultsService.submitPage(
                answersArr,
            );

            return res.status(201).json({data : createData});
        }catch (err) {
            return res.status(400).json({err:err.message})
            } 



    }
    // 결과 데이터 GET , api/results/:resultId
    resultPage = async (req,res,next)=>{
        const { resultId } = req.params;
        const data = await this.countryinfoService.resultPage(resultId)
        return res.status(200).json(data);
    }
}

module.exports = ResultsController