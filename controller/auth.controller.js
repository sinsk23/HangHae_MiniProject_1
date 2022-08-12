const AuthService = require("../services/auth.service");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

class AuthController {
  authService = new AuthService();
  signupSchema = Joi.object({
    userId: Joi.string().min(6).max(12).alphanum().required(),
    nickname: Joi.string().min(6).max(12).alphanum().required(),
    password: Joi.string().min(5).max(12).alphanum().required(),
    confirm: Joi.string().min(5).max(12).alphanum().required(),
  });
  loginSchema = Joi.object({
    userId: Joi.string().min(6).max(12).alphanum().required(),
    password: Joi.string().min(5).max(12).required(),
  });

  signUp = async (req, res, next) => {
    try {
      console.log("** --- AuthController.signUp ---");

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

      console.log("** --- AuthController.signUp Returns---");
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

  login = async (req, res, next) => {
    try {
      console.log("** --- AuthController.login ---");
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

      console.log("** --- AuthController.login Returns---");

      if (success) {
        res.cookie("token", `Bearer ${token}`, {
          maxAge: 30000, // 원활한 테스트를 위해 로그인 지속시간을 30초로 두었다.
          httpOnly: true,
        });
        return res.status(200).end();
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

  loginWithData = async (req, res, next) => {
    try {
      console.log("** --- AuthController.login ---");
      // joi 객체의 스키마를 잘 통과했는지 확인
      const { answersId, userId, password } =
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

      await this.authService.leaveUserIdon(userId, password);

      console.log("** --- AuthController.login Returns---");

      if (success) {
        res.cookie("token", `Bearer ${token}`, {
          maxAge: 30000, // 원활한 테스트를 위해 로그인 지속시간을 30초로 두었다.
          httpOnly: true,
        });
        return res.status(200).end();
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

  // loginWithData = (req, res, next) => {
  //   return res.send("This is Create Account Page");
  // };

  // logout = (req, res, next) => {
  //   return res.send("This is Create Account Page");
  // };
}

module.exports = AuthController;
