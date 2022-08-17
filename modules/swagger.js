// 스웨거 관련 모듈 임포트
const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

// 스웨거 메인페이지 콘텐츠 정보 입력
const options = {
  swaggerDefinition: {
    info: {
      title: "Trapick BackEnd Server is Listening!",
      version: "1.1.0",
      description: `</br>
        (연습을 위한 미니프로젝트이므로 ERD도 여기에 두어 기록합니다.)
        <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8306dd1d-d25f-4e54-bac6-f65f94ca3e6d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220817%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220817T082419Z&X-Amz-Expires=86400&X-Amz-Signature=703631e7734121e1088fc47bf7392ea92df2eb241482666e0c6b878920d23527&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="image" width="800">
        </br>
        <b>성향별 여행지 추천을 위한 Trapick의 백엔드 API입니다.</b> - 명세는 아래와 같습니다.
        </br>
        `,
    },
    host: "http://nodeapi.myspaceti.me:8002",
    basePath: "/api",
  },
  apis: [
    "./routes/auth.routes.js",
    "./routes/results.routes.js",
    "./routes/mypage.routes.js",
  ],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
