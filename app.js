require("dotenv").config();

const express = require("express");
const app = express();

const Http = require("http");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

// 로그(log)를 관리하기 위한 서드파티 라이브러리
const morgan = require("morgan");
app.use(morgan("dev"));

// 켜지지 않도록 주의 : sequelize 강제 초기화 하는 기능
// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

const http = Http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

http.listen(port, () => {
  console.log(`Start listen Server: ${port}`);
});

module.exports = http;
