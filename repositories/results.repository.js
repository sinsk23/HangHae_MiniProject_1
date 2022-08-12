// 필요한 시퀄라이즈 모델을 확보합니다.
const { Result } = require("../models");

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
    const updatedResult = await Result.update(
      { userId }, // 해당 데이터의 userId를 채워 넣습니다.
      { where: { resultId } }
    );
    console.log("****** --- ResultsRepository.getUserbyUserId Returns ---");
    return updatedResult; // 완성된 result데이터 반환
  };
}

module.exports = ResultsRepository;
