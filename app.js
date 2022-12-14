require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const Http = require("http");
const Https = require("https");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

const fs = require("fs");
const options = {
  key: fs.readFileSync("./ssl/www_myspaceti.me.key"),
  cert: fs.readFileSync("./ssl/www_myspaceti.me_cert.crt"),
  ca: fs.readFileSync("./ssl/www_myspaceti.me_chain_cert.crt"),
};

// 로그(log)를 관리하기 위한 서드파티 라이브러리
const morgan = require("morgan");
app.use(morgan("dev"));

const http = Http.createServer(app);
const https = Https.createServer(options, app);

const http_port = process.env.HTTP_PORT || 3000;
const https_port = process.env.HTTPS_PORT || 443;

const corsOption = {
  origin: ["http://localhost:3000", "http://nodeapi.myspaceti.me:8002"],
  credentials: true,
};

app.use(cors(corsOption));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

// // 개발기간 DB 초기화 기능 켜지지 않도록 주의 _ 하나씩 켜기
// // 1. sequelize 강제 초기화 하는 기능
// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

// // 2. db에 CountryInfo 초기화 하는 기능
// const dataInitializer = require("./dataInitializer");
// dataInitializer();

http.listen(http_port, () => {
  console.log(`Start listen Server: ${http_port}`);
});
https.listen(https_port, () => {
  console.log(`Start listen Server: ${https_port}`);
});

module.exports = app;
