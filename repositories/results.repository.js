// 필요한 시퀄라이즈 모델을 확보합니다.
const { Result } = require("../models");
const { User } = require("../models");

// 저장소 클래스를 선언합니다.
class ResultsRepository {
  // 특정 result 데이터의 결과정보를 불러온다.
  getResultById = async (resultId) => {
    console.log("****** --- ResultsRepository.getResultById ---");
    const result = await Result.findOne({ where: { resultId } });
    console.log("****** --- ResultsRepository.getResultById Returns ---");
    return result;
  };

  // 특정 result 데이터에 userId 값을 채워 준다.
  leaveUserOnResult = async (userId, resultId) => {
    console.log("****** --- ResultsRepository.leaveUserOnResult ---");

    // userId의 _id 를 찾아서,
    const { _id } = await User.findOne({ where: { userId } });

    // 결과값 userIdNo에 연결해 기입해둡니다
    const updatedResult = await Result.update(
      { userIdNo: _id },
      { where: { resultId } }
    );
    console.log("****** --- ResultsRepository.getUserbyUserId Returns ---");
    return updatedResult; // 완성된 result데이터 반환
  };

  createData = async(answersArr) =>{
    console.log("****** --- ResultsRepository.createAnswersArr Returns ---");
    
    const resultArr = await Result.create({
      answersArr,
    });

    return resultArr;
  }
  
}

module.exports = ResultsRepository;
