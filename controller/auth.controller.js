const AuthService = require("../services/auth.service");
const UserRepository = require("../repositories/users.repository");
const MY_SECRET_KEY = process.env.MY_SECRET_KEY;
const jwt = require("jsonwebtoken");
const Joi = require("joi");

class AuthController {
  authService = new AuthService();
  userRepository = new UserRepository();

  signupSchema = Joi.object({
    userId: Joi.string().min(6).max(12).alphanum().required(),
    nickname: Joi.string().min(6).max(12).alphanum().required(),
    password: Joi.string().min(5).max(12).alphanum().required(),
    confirm: Joi.string().min(5).max(12).alphanum().required(),
  });
  loginSchema = Joi.object({
    resultId: Joi.number().integer(),
    userId: Joi.string().min(6).max(12).alphanum().required(),
    password: Joi.string().min(5).max(12).required(),
  });

  // 회원가입 진행
  signUp = async (req, res, next) => {
    try {
      // joi 객체의 스키마를 잘 통과했는지 확인
      const { userId, nickname, password, confirm } =
        await this.signupSchema.validateAsync(req.body);

      // 헤더가 인증정보를 가지고 있으면 (로그인 되어 있으면,)
      if (req.cookies.token) {
        console.log("이미 로그인이 되어있습니다.");
        res.status(400).send({
          errorMessage: "이미 로그인이 되어있습니다.",
        });
        return;
      }

      // ---- 추가적인 유효성 검사 (validation) ------
      // 입력된 패스워드 2개가 같은지 확인
      if (password !== confirm) {
        console.log("입력하신 두개의 비밀번호가 다릅니다");
        res.status(400).send({
          errorMessage: "입력하신 두개의 비밀번호가 다릅니다",
        });
        return;
      }

      // 패스워드가 닉네임을 포함하는지 확인
      if (password.includes(userId)) {
        console.log("비밀번호는 ID를 포함할 수 없습니다.");
        return res.status(400).send({
          errorMessage: "비밀번호는 ID를 포함할 수 없습니다. ",
        });
      }
      // ---- 추가적인 유효성 검사 (validation) End ------

      // signUp 서비스 진행해보고 결과 응답
      const { success, message } = await this.authService.signUp(
        userId,
        nickname,
        password
      );

      if (success) {
        return res.status(200).json({ message });
      } else {
        return res.status(400).json({ message });
      }
    } catch (error) {
      const message = `${req.method} ${req.originalUrl} : ${error.message}`;
      console.log(message + "입력하신 아이디와 패스워드를 확인해주세요.");
      res.status(400).send({
        errorMessage: message + "입력하신 아이디와 패스워드를 확인해주세요.",
      });
    }
    return res.send("This is Create Account Page");
  };

  // 로그인만 진행할 때,
  login = async (req, res, next) => {
    try {
      // joi 객체의 스키마를 잘 통과했는지 확인
      const { userId, password } = await this.loginSchema.validateAsync(
        req.body
      );

      // 헤더가 인증정보를 가지고 있으면 (로그인 되어 있으면,) 반려
      if (req.cookies.token) {
        return res
          .status(400)
          .send({ errorMessage: "이미 로그인이 되어있습니다." });
      }

      const { success, token } = await this.authService.getToken(
        userId,
        password
      );

      if (success) {
        res.cookie("token", `Bearer ${token}`, {
          sameSite: "none",
          secure: true, // https, ssl 모드에서만
          maxAge: 60000, // 1D
          httpOnly: true, // javascript 로 cookie에 접근하지 못하게 한다.
        });
        return res.status(200).send({
          message: "로그인에 성공했습니다.",
        });
      } else {
        return res
          .status(400)
          .json({ message: "입력하신 아이디 또는 패스워드를 확인해주세요." });
      }
    } catch (error) {
      const message = `${req.method} ${req.originalUrl} : ${error.message}`;
      res.status(400).send({ message });
    }
  };

  // 로그인과 동시에 기록된 데이터를 연결하고자 할 때,
  loginWithData = async (req, res, next) => {
    try {
      // joi 객체의 스키마를 잘 통과했는지 확인
      const { resultId, userId, password } =
        await this.loginSchema.validateAsync(req.body);

      // 헤더가 인증정보를 가지고 있으면 (로그인 되어 있으면,) 반려
      if (req.cookies.token) {
        return res
          .status(400)
          .send({ errorMessage: "이미 로그인이 되어있습니다." });
      }

      const { success, token } = await this.authService.getToken(
        userId,
        password
      );

      if (success) {
        res.cookie("token", `Bearer ${token}`, {
          maxAge: 30000, // 원활한 테스트를 위해 로그인 지속시간을 30초로 두었다.
          httpOnly: true,
        });

        // 결과에 userId 기록
        const { success, message } = await this.authService.leaveUserOnResult(
          userId,
          resultId
        );

        if (success) {
          return res
            .status(200)
            .json({ message: "로그인이 완료되었으며, " + message });
        } else {
          return res
            .status(400)
            .json({ message: "로그인이 완료되었으나, " + message });
        }
      } else {
        return res
          .status(400)
          .json({ message: "입력하신 아이디 또는 패스워드를 확인해주세요." });
      }
    } catch (error) {
      const message = `${req.method} ${req.originalUrl} : ${error.message}`;
      res.status(400).send({ message });
    }
  };

  // 로그인이 되어 있어야 거칠 수 있음 : 로그인 된 경우 res.locals에 user 페이로드 저장
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

        let user = await this.userRepository.getUserbyUserId(decoded.userId);
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

  // 로그인 되어 있건 안 되었건 분기시키는 역할 - next() 호출
  authMiddlewareCases = (req, res, next) => {
    // authMiddleware 메소드 입출입을 확인하기 위한 콘솔로그
    console.log("------ 🤔 Authorization Checking ------");

    console.log(req.cookies.token);
    try {
      const authorization = req.cookies.token;
      const [authType, authToken] = (authorization || "").split(" ");

      // 전달받은 인증값이 Bearer로 시작하지 않으면 인증 실패
      if (authType !== "Bearer") {
        console.log("------  ❌ Not Logged in 로그인 없이 next 진행 ------");
        res.locals.user = null;
        next();
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

        let user = await this.userRepository.getUserbyUserId(decoded.userId);
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

module.exports = AuthController;
