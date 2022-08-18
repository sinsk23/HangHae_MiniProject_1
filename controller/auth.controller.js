const AuthService = require("../services/auth.service");
const UserRepository = require("../repositories/users.repository");
const ResultsRepository = require("../repositories/results.repository");
const MY_SECRET_KEY = process.env.MY_SECRET_KEY;
const jwt = require("jsonwebtoken");
const Joi = require("joi");

class AuthController {
  authService = new AuthService();
  userRepository = new UserRepository();
  resultsRepository = new ResultsRepository();

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
        return res.send({
          statusCode: 400,
          message: "이미 로그인이 되어있습니다.",
        });
      }

      // ---- 추가적인 유효성 검사 (validation) ------
      // 입력된 패스워드 2개가 같은지 확인
      if (password !== confirm) {
        return res.send({
          statusCode: 400,
          message: "입력하신 두개의 비밀번호가 다릅니다.",
        });
      }

      // 패스워드가 닉네임을 포함하는지 확인
      if (password.includes(userId)) {
        console.log("비밀번호는 ID를 포함할 수 없습니다.");
        return res.send({
          statusCode: 400,
          message: "비밀번호는 ID를 포함할 수 없습니다.",
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
        return res.status(200).json({ statusCode: 200, message });
      } else {
        return res.send({
          statusCode: 400,
          message,
        });
      }
    } catch (error) {
      const message = `${req.method} ${req.originalUrl} : ${error.message}`;
      console.log(message + "입력하신 아이디와 패스워드를 확인해주세요.");
      return res.send({
        statusCode: 400,
        errReason: message,
        message: "입력하신 아이디와 패스워드를 확인해주세요.",
      });
    }
  };

  // 로그인만 진행할 때,
  login = async (req, res, next) => {
    try {
      // joi 객체의 스키마를 잘 통과했는지 확인
      const { userId, password } = await this.loginSchema.validateAsync(
        req.body
      );

      // 헤더가 인증정보를 가지고 있으면 (로그인 되어 있으면,) 반려
      // console.log("req", req);
      // console.log("req.headers.token :", req.headers.token);
      if (req.header.token) {
        return res.send({
          statusCode: 400,
          message: "이미 로그인이 되어있습니다.",
        });
      }

      const { success, token } = await this.authService.getToken(
        userId,
        password
      );

      let { _id } = await this.userRepository.getUserbyUserId(userId);
      let results = await this.resultsRepository.getResultByUserIdNo(_id);

      console.log(results?.resultId);

      if (success) {
        return res
          .cookie("token", `Bearer ${token}`, {
            sameSite: "none",
            secure: true, // https, ssl 모드에서만
            maxAge: 60000, // 1D
            httpOnly: true, // javascript 로 cookie에 접근하지 못하게 한다.
          })
          .status(200)
          .send({
            statusCode: 200,
            resultId: results?.resultId || "",
            token: `Bearer ${token}`,
            message: "로그인에 성공했습니다.",
          })
          .end();
      } else {
        return res.send({
          statusCode: 401,
          message: "입력하신 아이디 또는 패스워드를 확인해주세요.",
        });
      }
    } catch (error) {
      const message = `${req.method} ${req.originalUrl} : ${error.message}`;
      return res.send({ statusCode: 400, message });
    }
  };

  // 로그인과 동시에 기록된 데이터를 연결하고자 할 때,
  loginWithData = async (req, res, next) => {
    try {
      // joi 객체의 스키마를 잘 통과했는지 확인
      const { resultId, userId, password } =
        await this.loginSchema.validateAsync(req.body);

      // 헤더가 인증정보를 가지고 있으면 (로그인 되어 있으면,) 반려
      console.log("req.header", req.header);
      if (req.header.token) {
        return res.send({
          statusCode: 400,
          errReason: message,
          message: "이미 로그인이 되어있습니다.",
        });
      }

      if (req.cookies.token) {
        const authorization = req.cookies.token;
        console.log("authorization:", authorization);
        const [authType, authToken] = (authorization || "").split(" ");
        jwt.verify(authToken, MY_SECRET_KEY, async (error, decoded) => {
          let user = await this.userRepository.getUserbyUserId(decoded.userId);
          console.log("쿠키체크:", user);
        });
      }

      const { success, token } = await this.authService.getToken(
        userId,
        password
      );

      let { _id } = await this.userRepository.getUserbyUserId(userId);

      let results = await this.resultsRepository.getResultByUserIdNo(_id);

      console.log("resultIdFromDB:", results?.resultId);

      if (success) {
        // 결과에 userId 기록
        const { success, message } = await this.authService.leaveUserOnResult(
          userId,
          resultId
        );

        if (success) {
          return res
            .cookie("token", `Bearer ${token}`, {
              sameSite: "none",
              secure: true, // https, ssl 모드에서만
              maxAge: 60000, // 1D
              httpOnly: true, // javascript 로 cookie에 접근하지 못하게 한다.
            })
            .status(200)
            .json({
              statusCode: 200,
              token: `Bearer ${token}`,
              resultId: resultId || results?.resultId,
              message: "로그인이 완료되었으며, " + message,
            });
        } else {
          return res
            .cookie("token", `Bearer ${token}`, {
              sameSite: "none",
              secure: true, // https, ssl 모드에서만
              maxAge: 60000, // 1분
              httpOnly: true, // javascript 로 cookie에 접근하지 못하게 한다.
            })
            .json({
              statusCode: 400,
              token: `Bearer ${token}`,
              resultId: results?.resultId || "",
              message: "로그인이 완료되었으나, " + message,
            });
        }
      } else {
        return res.send({
          statusCode: 401,
          message: "입력하신 아이디 또는 패스워드를 확인해주세요.",
        });
      }
    } catch (error) {
      const message = `${req.method} ${req.originalUrl} : ${error.message}`;
      return res.send({
        statusCode: 400,
        message,
      });
    }
  };

  // 로그인이 되어 있어야 거칠 수 있음 : 로그인 된 경우 res.locals에 user 페이로드 저장
  authMiddleware = (req, res, next) => {
    // authMiddleware 메소드 입출입을 확인하기 위한 콘솔로그
    console.log("------ 🤔 Authorization Checking ------");

    try {
      console.log("req", req);
      console.log("req.header", req.headers.token);
      const authorization = req.header.token;
      const [authType, authToken] = (authorization || "").split(" ");

      // 전달받은 인증값이 Bearer로 시작하지 않으면 인증 실패
      if (authType !== "Bearer") {
        return res.send({
          statusCode: 400,
          message: "로그인 후 사용해주세요.",
        });
      }
      jwt.verify(authToken, MY_SECRET_KEY, async (error, decoded) => {
        // 인증 결과 에러가 나타나면 클라이언트와 서버에 모두 에러를 던지고 미들웨어 종료
        if (error) {
          return res.send({
            statusCode: 400,
            message: "이용에 문제가 있습니다. 관리자에게 문의해주세요.",
          });
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
      return res.send({
        statusCode: 400,
        message: "로그인 후 사용하세요",
      });
    }
  };

  // 로그인 되어 있건 안 되었건 분기시키는 역할 - next() 호출
  authMiddlewareCases = (req, res, next) => {
    // authMiddleware 메소드 입출입을 확인하기 위한 콘솔로그
    console.log("------ 🤔 Authorization Checking ------");

    console.log("req", req);
    console.log("req.header", req.header);
    try {
      const authorization = req.header.token;
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
          return res.send({
            statusCode: 401,
            message: "이용에 문제가 있습니다. 관리자에게 문의해주세요.",
          });
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
      return res.send({
        statusCode: 401,
        message: "로그인 후 사용하세요.",
      });
    }
  };
}

module.exports = AuthController;
