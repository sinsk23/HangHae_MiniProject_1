// 필요한 시퀄라이즈 모델을 확보합니다.
const { User } = require("../models");
const crypto = require("crypto");

// 저장소 클래스를 선언합니다.
class UserRepository {
  // userId에 해당하는 1명의 유저를 찾아 리턴한다.
  getUserbyUserId = async (userId) => {
    const userInfo = await User.findOne({
      where: { userId },
    });

    return userInfo;
  };
  // nickname에 해당하는 1명의 유저를 찾아 리턴한다.
  getUserbyNickname = async (nickname) => {
    const userInfo = await User.findOne({
      where: { nickname },
    });

    return userInfo;
  };
  // userId에 해당하는 1명의 유저를 찾아 리턴한다.
  getUserbyId = async (_id) => {
    // 찾아서
    const userInfo = await User.findOne({
      where: { _id },
    });

    // 리턴
    return userInfo;
  };
  // userId와 password 동시에 맞는 1명의 유저를 찾는다.
  getUserbyIdPw = async (userId, password) => {
    const { password_salt } = await User.findOne({
      where: { userId },
    });
    const { hashedPassword } = this.hashFunction(password, password_salt);
    // 찾아서
    const userInfo = await User.findOne({
      where: { userId, password: hashedPassword },
    });

    // 리턴
    return userInfo;
  };
  // User DB 생성
  createUser = async (userId, nickname, password) => {
    const { hashedPassword, salt } = this.hashFunction(password);

    // 전달받은 인자와 Hashed 암호를 담아 DB에 전달하여 저장합니다.
    const createUserData = await User.create({
      userId,
      nickname,
      password: hashedPassword,
      password_salt: salt,
    });

    // 방금 생성한 유저 데이터를 리턴
    return createUserData;
  };

  hashFunction = (password, mysalt) => {
    const salt = mysalt || crypto.randomBytes(128).toString("base64");
    const hashedPassword = crypto
      .createHash("sha512")
      .update(password + salt)
      .digest("hex");
    return { hashedPassword, salt };
  };
}

module.exports = UserRepository;
