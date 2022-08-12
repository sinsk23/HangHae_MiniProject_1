// AuthService에서는 사용자 데이터를 활용하기 때문에 User Repository를 호출한다.
const UserRepository = require("../repositories/users.repository");
const jwt = require("jsonwebtoken");
const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

// 가입 및 인증 관련서비스
class AuthService {
  // 클래스 안에서 활용할 인스턴스를 확보
  userRepository = new UserRepository();

  // 검증이 완료된 nickname과 password를 받아, 기존 유저가 없으면
  signUp = async (userId, nickname, password) => {
    console.log("**** --- AuthService.signUp ---");
    const idExist = await this.userRepository.getUserbyUserId(userId);
    const nicknameExist = await this.userRepository.getUserbyNickname(nickname);

    // 기존에 같은 userID를 가진 유저가 있으면 에러메세지
    if (idExist) {
      console.log("**** --- AuthService.signUp Returns ---");
      return { success: false, message: "이미 사용중인 아이디 입니다." };
    } else if (nicknameExist) {
      console.log("**** --- AuthService.signUp Returns ---");
      return { success: false, message: "이미 사용중인 닉네임 입니다." };
    } else {
      // 기존에 같은 닉네임을 가진 유저가 없으면 가입 가능
      await this.userRepository.createUser(userId, nickname, password);
      console.log("**** --- AuthService.signUp Returns ---");
      return { success: true, message: "회원 가입에 성공하였습니다." };
    }
  };

  // 검증이 완료된 userId와 password를 받아, 토큰을 반환해줍니다.
  getToken = async (userId, password) => {
    console.log("**** --- AuthService.getToken ---");

    // 접속을 시도한 동일한 유저정보(ID, PW)가 있는지 확인해보고,
    const user = await this.userRepository.getUserbyIdPw(userId, password);

    // 찾아봤는데 DB에 그런 user가 없으면 반려
    if (!user) {
      console.log("**** --- AuthService.getToken Returns ---");
      return {
        success: false,
        message: "닉네임 또는 패스워드를 확인해주세요.",
      };

      // DB에 그런 user가 있으면 userId를 payload에 담은 토큰에 서명,발행하여 리턴
    } else {
      const token = jwt.sign(
        { userId: user.userId, nickname: user.nickname },
        MY_SECRET_KEY
      );
      console.log("**** --- AuthService.getToken Returns ---");
      return { success: true, token: token };
    }
  };
}

module.exports = AuthService;
