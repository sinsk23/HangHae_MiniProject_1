// AuthService에서는 사용자 데이터를 활용하기 때문에 User Repository를 호출한다.
const UserRepository = require("../repositories/users.repository");
const ResultRepository = require("../repositories/results.repository");
const jwt = require("jsonwebtoken");
const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

// 가입 및 인증 관련서비스
class AuthService {
  // 클래스 안에서 활용할 인스턴스를 확보
  userRepository = new UserRepository();
  resultRepository = new ResultRepository();

  // 검증이 완료된 nickname과 password를 받아, 기존 유저가 없으면
  signUp = async (userId, nickname, password) => {
    const idExist = await this.userRepository.getUserbyUserId(userId);
    const nicknameExist = await this.userRepository.getUserbyNickname(nickname);

    // 기존에 같은 userID를 가진 유저가 있으면 에러메세지
    if (idExist) {
      return { success: false, message: "이미 사용중인 아이디 입니다." };
    } else if (nicknameExist) {
      return { success: false, message: "이미 사용중인 닉네임 입니다." };
    } else {
      // 기존에 같은 닉네임을 가진 유저가 없으면 가입 가능
      await this.userRepository.createUser(userId, nickname, password);
      return { success: true, message: "회원 가입에 성공하였습니다." };
    }
  };

  // 검증이 완료된 userId와 password를 받아, 토큰을 반환해줍니다.
  getToken = async (userId, password) => {
    // 접속을 시도한 동일한 유저정보(ID, PW)가 있는지 확인해보고,
    const user = await this.userRepository.getUserbyIdPw(userId, password);

    // 찾아봤는데 DB에 그런 user가 없으면 반려
    if (!user) {
      return {
        success: false,
        message: "아이디 또는 패스워드를 확인해주세요.",
      };

      // DB에 그런 user가 있으면 userId를 payload에 담은 토큰에 서명,발행하여 리턴
    } else {
      const token = jwt.sign(
        {
          userId: user.userId,
          nickname: user.nickname,
          userIdNo: user._id,
        },
        MY_SECRET_KEY
      );
      return { success: true, token: token };
    }
  };

  leaveUserOnResult = async (userId, resultId) => {
    // resultRepository에서 결과데이터를 찾아보고,

    let result;

    if (!resultId) {
      result = undefined;
    } else {
      result = await this.resultRepository.getResultById(resultId);
    }

    // 찾아봤는데 DB에 그런 result가 없으면 반려
    if (!result) {
      return {
        success: false,
        message: "저장할 결과데이터가 없습니다.",
      };

      // DB에 resultId 핻당하는 데이터결과가 있으면
    } else {
      // 로그인 한 userId를 이번 결과데이터에 넣어주고,
      await this.resultRepository.leaveUserOnResult(userId, resultId);

      return {
        success: true,
        message: "결과데이터에 userId를 기록했습니다.",
      };
    }
  };
}

module.exports = AuthService;
