const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/users.repository");
const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

class Auth {
  // 클래스 안에서 User 저장소 인스턴스를 사용
  userRepository = new UserRepository();

  authMiddleware = (req, res, next) => {
    // authMiddleware 메소드 입출입을 확인하기 위한 콘솔로그
    console.log("------ 🤔 Authorization Checking ------");

    try {
      const authorization = req.cookies.token;
      const [authType, authToken] = (authorization || "").split(" ");

      // 전달받은 인증값이 Bearer로 시작하지 않으면 인증 실패
      if (authType !== "Bearer") {
        res.status(401).send({
          errorMessage: "로그인 후 사용해주세요",
        });
        return;
      }
      jwt.verify(authToken, MY_SECRET_KEY, async (error, decoded) => {
        // 인증 결과 에러가 나타나면 클라이언트와 서버에 모두 에러를 던지고 미들웨어 종료
        if (error) {
          res.status(401).send({
            errorMessage: "이용에 문제가 있습니다. 관리자에게 문의해주세요.",
          });
          return;
        }

        let user = await this.userRepository.getUserbyId(decoded.userId);
        console.log("------ ✅  Authorization Checked ------");

        // 다 통과하면 토큰을 복호화하여 user 정보를 다음 미들웨어가 사용할 수 있는 형태로 넘겨준다.
        res.locals.user = user;
        next();
        return;
      });

      // 에러 생기면 에러메세지
    } catch (e) {
      res.status(401).send({
        errorMessage: "로그인 후 사용하세요",
      });
      return;
    }
  };
}

// 미들웨어 사용할 수 있게 export
module.exports = Auth;
