require('dotenv').config();
const express = require('express');
const Http = require('http');
const routes = require('./routes');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

app.use(morgan('dev'));

const http = Http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/', routes);

http.listen(port, () => {
  console.log(`Start listen Server: ${port}`);
});

module.exports = http;
