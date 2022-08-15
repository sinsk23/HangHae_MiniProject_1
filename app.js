require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const Http = require("http");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

// 로그(log)를 관리하기 위한 서드파티 라이브러리
const morgan = require("morgan");
app.use(morgan("dev"));

const http = Http.createServer(app);
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

// 개발기간 DB 초기화 기능
// 켜지지 않도록 주의 : sequelize 강제 초기화 하는 기능
// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

// db에 CountryInfo 초기화 하는 기능
// const inputData = require("./sort_data/countryInfo.json");
// const CountryInfoRepository = require("./repositories/countryInfo.repository");
// const countryInfoRepository = new CountryInfoRepository();

// for (let i = 0; i < inputData.length; i++) {
//   countryInfoRepository
//     .createCountryInfoDirectFn(inputData[i])
//     .then((e) => console.log(e));
// }

http.listen(port, () => {
  console.log(`Start listen Server: ${port}`);
});

module.exports = http;
