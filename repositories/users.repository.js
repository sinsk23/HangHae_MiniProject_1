// 필요한 시퀄라이즈 모델을 확보합니다.
const { User } = require("../models");

// 저장소 클래스를 선언합니다.
class UserRepository {
  // userId에 해당하는 1명의 유저를 찾아 리턴한다.
  getUserbyUserId = async (userId) => {
    console.log("****** --- UserRepository.getUserbyUserId ---");

    const userInfo = await User.findOne({
      where: { userId },
    });

    console.log("****** --- UserRepository.getUserbyUserId Returns ---");
    return userInfo;
  };
  // nickname에 해당하는 1명의 유저를 찾아 리턴한다.
  getUserbyNickname = async (nickname) => {
    console.log("****** --- UserRepository.getUserbyNickname ---");

    const userInfo = await User.findOne({
      where: { nickname },
    });

    console.log("****** --- UserRepository.getUserbyNickname Returns ---");
    return userInfo;
  };

  // userId에 해당하는 1명의 유저를 찾아 리턴한다.
  getUserbyId = async (_id) => {
    console.log("****** --- UserRepository.getUserbyId ---");

    // 찾아서
    const userInfo = await User.findOne({
      where: { _id },
    });

    console.log("****** --- UserRepository.getUserbyId Returns ---");
    // 리턴
    return userInfo;
  };

  // userId와 password 동시에 맞는 1명의 유저를 찾는다.
  getUserbyIdPw = async (userId, password) => {
    console.log("****** --- UserRepository.getUserbyIdPw ---");
    // 찾아서
    const userInfo = await User.findOne({
      where: { userId, password },
    });

    console.log("****** --- UserRepository.getUserbyIdPw Returns ---");
    // 리턴
    return userInfo;
  };

  // User DB 생성
  createUser = async (userId, nickname, password) => {
    console.log("****** --- UserRepository.createUser ---");
    // 전달받은 인자를 담아 DB에 전달하여 저장합니다.
    const createUserData = await User.create({ userId, nickname, password });

    console.log("****** --- UserRepository.createUser Returns ---");
    // 방금 생성한 유저 데이터를 리턴
    return createUserData;
  };
}

module.exports = UserRepository;
