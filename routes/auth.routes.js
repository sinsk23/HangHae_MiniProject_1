const express = require("express");

const AuthController = require("../controller/auth.controller");
const authController = new AuthController();

const router = express.Router();

// 스웨거 모듈 임포트
const { swaggerUi, specs } = require("../modules/swagger.js");

// 이 라우터는 대부분 로그인/아웃 관련 역할을 진행함
router.post("/signUp", authController.signUp);
router.post("/login", authController.login);
router.post("/login/withsave", authController.loginWithData);
// router.get("/logout", authController.logout);

// '/api' 이 경로 주소에 곧장 swagger 페이지 사용
router.use("/", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;

/**
 * @swagger
 *  /api/signup:
 *    post:
 *      tags:
 *      - Auths
 *      description: 회원가입
 *      operationId : signup
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Created user object"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            userId:
 *              type: string
 *              example: 'tester1'
 *            nickname:
 *              type: string
 *              example: 'TESTER1'
 *            password:
 *              type: string
 *              example: '12345'
 *            confirm:
 *              type: string
 *              example: '123455'
 *      responses:
 *        200:
 *          description: "회원 가입에 성공하였습니다."
 *        400-1:
 *          description: "이미 로그인이 되어있습니다."
 *        400-2:
 *          description: "입력하신 두개의 비밀번호가 다릅니다"
 *        400-3:
 *          description: "비밀번호는 ID를 포함할 수 없습니다."
 *        400-4:
 *          description: "이미 사용중인 아이디 입니다."
 *        400-5:
 *          description: "입력하신 아이디와 패스워드를 확인해주세요.(ID 6자 이상, PW 5자 이상 문자)"
 */

/**
 * @swagger
 *  /api/login:
 *    post:
 *      tags:
 *      - Auths
 *      description: 로그인
 *      operationId : login
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Login here"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            userId:
 *              type: string
 *              example: 'tester1'
 *            password:
 *              type: string
 *              example: '12345'
 *      responses:
 *        200:
 *          description: "로그인에 성공했습니다. (유효 토큰을 Cookie에 반환하여 로그인을 활성화합니다.)"
 *        400-1:
 *          description: "이미 로그인이 되어있습니다."
 *        400-2:
 *          description: "아이디 또는 패스워드를 확인해주세요."
 *        400-3:
 *          description: "유효한 아이디와 패스워드를 입력해주세요. (ID 6자 이상, PW 5자 이상)"
 */

/**
 * @swagger
 *  /api/login/withsave:
 *    post:
 *      tags:
 *      - Auths
 *      description: 저장할 데이터가 있는 상태에서 로그인
 *      operationId : loginWithData
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Login with resultData to save"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            userId:
 *              type: string
 *              example: 'tester1'
 *            resultId:
 *              type: number
 *              example: 'tester1'
 *            password:
 *              type: string
 *              example: '12345'
 *      responses:
 *        200:
 *          description: "로그인이 완료되었으며, 결과데이터에 userId를 기록했습니다.(유효 토큰을 Cookie에 반환하여 로그인을 활성화합니다.)"
 *        400-1:
 *          description: "이미 로그인이 되어있습니다."
 *        400-2:
 *          description: "아이디 또는 패스워드를 확인해주세요."
 *        400-3:
 *          description: "유효한 아이디와 패스워드를 입력해주세요. (ID 6자 이상, PW 5자 이상)"
 *        400-4:
 *          description: "로그인이 완료되었으나, 저장할 결과데이터가 없습니다."
 */
