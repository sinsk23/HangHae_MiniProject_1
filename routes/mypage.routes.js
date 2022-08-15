const express = require("express");

const MypageController = require("../controller/mypage.controller");
const mypageController = new MypageController();

const AuthController = require("../controller/auth.controller");
const authController = new AuthController();

const router = express.Router();

// 마이페이지의 정보 불러오기
router.get("/", authController.authMiddleware, mypageController.bringMypage);

//내 결과정보도 불러오기
//(가장 마지막 추천 결과 GET)
router.get(
  "/myanswers",
  authController.authMiddleware,
  mypageController.bringMyinfo
);

module.exports = router;

/**
 * @swagger
 *  /api/mypage:
 *    get:
 *      tags:
 *      - Mypage
 *      description: 나의 정보 (아이디와 닉네임) 불러오기 (로그인 상태에서만 호출 가능)
 *      operationId : mypage
 *      responses:
 *        200:
 *          schema:
 *           type: object
 *           properties:
 *            userId:
 *              type: string
 *              example: "tester1"
 *            nickname:
 *              type: string
 *              example: "TESTER1"
 *        400-1:
 *          description: "PossibleErrorMessage"
 */

/**
 * @swagger
 *  /api/mypage/myanswers:
 *    get:
 *      tags:
 *      - Mypage
 *      description: 내가 제출했던 추천 나라와 정보 확인 (로그인 상태에서만 호출 가능)
 *      operationId : myAnswer
 *      responses:
 *        200:
 *          schema:
 *           type: object
 *           properties:
 *            resultId:
 *              type: integer
 *              example: 3
 *            recommendedCountryId:
 *              type: integer
 *              example: 10
 *            countryInfo:
 *              type: object
 *              properties:
 *                recommendedId:
 *                  type: integer
 *                  example: 10
 *                countryCode:
 *                  type: string
 *                  example: "392"
 *                countryName:
 *                  type: string
 *                  example: "일본"
 *                countryDomain:
 *                  type: string
 *                  example: "JP"
 *                continent:
 *                  type: string
 *                  example: "동아시아"
 *                headText:
 *                  type: string
 *                  example: "몸과 마음을 녹여줄 최고의 휴양지"
 *                detailText:
 *                  type: string
 *                  example: "일본 최북단의 청정 지역인 홋카이도는(중략) 공원도 즐기며 중앙 농지의 유명한 라벤더밭도 구경해 보세요."
 *                resultImageUrl:
 *                  type: string
 *                  example: "http://cdn.cnn.com/cnnnext/dam/assets/181115161449-11-japanese-ryokans-nishimuraya.jpg"
 *                officialWebpage:
 *                  type: string
 *                  example: "https://www.0404.go.kr/dev/country_view.mofa?idx=183"
 *                getMoreCountryInfoUrl:
 *                  type: string
 *                  example: "https://restcountries.com/v3.1/alpha/392"
 *                getMoreVisitInfoUrl:
 *                  type: string
 *                  example: "https://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?serviceKey=UG7I9U2He6VkuSBf4wb7SfFKRdaeiaflGMj0nQGf6gMQIQkCVTYee%2F1j288mHKXDardXaxp%2FHeAgTWhQS9ejPw%3D%3D&returnType=JSON&cond[country_iso_alp2::EQ]=JP"
 *                createdAt:
 *                  type: string
 *                  example: "2022-08-14T11:16:05.000Z"
 *                updatedAt:
 *                  type: string
 *                  example: "2022-08-14T11:16:05.000Z"
 *            flag:
 *              type: string
 *              example: '🇯🇵'
 *            capital:
 *              type: string
 *              example: 'Tokyo'
 *            flagImgUrl:
 *              type: string
 *              example: 'https://flagcdn.com/w320/jp.png'
 *        400-1:
 *          description: "errorMessage"
 */
