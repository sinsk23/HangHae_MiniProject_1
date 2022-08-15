const express = require("express");

const ResultsController = require("../controller/results.controller");
const resultsController = new ResultsController();

const AuthController = require("../controller/auth.controller");
const authController = new AuthController();

const router = express.Router();

//전체 결과 페이지
router.get("/", resultsController.resultAllPage);


// FE단에서 /submit answersArr 데이터 받고 데이터를 :reultId로 보내 받기

//설문페이지
router.post(
  "/submit",
  authController.authMiddlewareCases,
  resultsController.submitPage
);

//결과페이지
router.get("/:resultId", resultsController.resultPage);

module.exports = router;

/**
 * @swagger
 *  /api/results/submit:
 *    post:
 *      tags:
 *      - Results
 *      description: 서베이 제출 후 저장
 *      operationId : submit
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "완성된 5문 답안의 키워드 배열"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            answersArr:
 *              type: array
 *              example: ["자연", "고가", "북미", "쇼핑", "모험"]
 *      responses:
 *        200:
 *          schema:
 *           type: object
 *           example: { resultId : 3 }
 *        400-1:
 *          description: "PossibleErrorMessage"
 */

/**
 * @swagger
 *  /api/results/{resultId}:
 *    get:
 *      tags:
 *      - Results
 *      description: 제출된 정보와 추천 나라 확인
 *      operationId : resultPage
 *      parameters:
 *      - in: "path"
 *        name: "resultId"
 *        description: "제출된 정보의 고유 resultId"
 *        required: true
 *        schema:
 *          type: integer
 *          example : 3
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
